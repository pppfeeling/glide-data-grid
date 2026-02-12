run_in_parallel() {
  local funcs=("$@")
  local pids=()

  # Start the functions in the background and store their PIDs
  for func in "${funcs[@]}"; do
    ($func) &
    pids+=($!)
  done

  # Wait for all functions and exit if any of them fail
  for pid in "${pids[@]}"; do
    wait $pid || exit $?
  done
}

generate_index_css() {
  echo "/* Auto-generated file */" > dist/index.css
  find dist/esm -name '*.css' -print | sed 's/^dist\/esm\//\@import ".\/esm\//' | sed 's/$/";/' >> dist/index.css
}

ensure_bash_4() {
    if [ "${BASH_VERSINFO[0]}" -lt 4 ]; then
        if [ -x "/opt/homebrew/bin/bash" ]; then
            exec /opt/homebrew/bin/bash "$0" "$@"
        elif [ -x "/usr/local/bin/bash" ]; then
            exec /usr/local/bin/bash "$0" "$@"
        else
            echo "Bash 4 or higher is required."
            exit 1
        fi
    fi
}

remove_all_css_imports() {
    local directory=$1
    local sed_cmd="sed -i"

    # Check if sed is GNU sed or BSD sed
    if sed --version 2>/dev/null | grep -q GNU; then
        sed_cmd="sed -i"  # GNU sed
    else
        sed_cmd="sed -i ''"  # BSD sed
    fi

    # find "$directory" -type f -name "*.js" -exec bash -c "$sed_cmd \"/require('.\/.*\.css');/d\" {}" \;
    # find "$directory" -type f -name "*.js" -exec bash -c "$sed_cmd \"/require('.\/.*\.css');/d;/import \\\".*\.css\\\";/d\" {}" \;
    find "$directory" -type f -name "*.js" -exec bash -c "$sed_cmd \"/import \\\".*\.css\\\";/d\" {}" \;
}

compile() {
    # 1. tsc로 기초 컴파일
    npx tsc -p tsconfig.$1.json --outdir ./dist/$1-tmp --declarationDir ./dist/dts-tmp
    
    # 2. 생성된 JS 파일들에 React Compiler(Babel) 적용 (추가 부분)
    npx babel ./dist/$1-tmp --out-dir ./dist/$1-tmp --config-file ../../babel.config.json
    npx wyw-in-js -r dist/$1-tmp/ -m esnext -o dist/$1-tmp/ dist/$1-tmp/**/*.js -t -i dist/$1-tmp -c ../../config/linaria.json > /dev/null
    remove_all_css_imports dist/$1-tmp

    # replace dist/$1 (if it exists) with dist/$1-tmp
    if [ -d "dist/$1" ]; then
        mv dist/$1 dist/$1-remove
        rm -rf dist/$1-remove
    fi
    echo "Moving dist/$1-tmp to dist/$1..."
    sleep 1
    mv dist/$1-tmp dist/$1



    # if it's esm, move the dts folder
    if [ "$2" = true ]; then
        if [ -d "dist/dts" ]; then
            mv dist/dts dist/dts-remove
            rm -rf dist/dts-remove
        fi
        mv dist/dts-tmp dist/dts
    fi

    rm dist/tsconfig.$1.tsbuildinfo
}