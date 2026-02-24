#!/bin/bash
input=$(cat)
MODEL=$(echo "$input" | jq -r '.model.display_name')
CONTEXT=$(echo "$input" | jq -r '.context_window.used_percentage // 0')
echo "[$MODEL] Context: ${CONTEXT}%"
