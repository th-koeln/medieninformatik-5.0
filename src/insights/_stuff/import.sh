#!/bin/bash

# Path to the CSV file
csv_file="/Users/volker/projects/test/source.csv"
output_directory="/Users/volker/projects/test/markdown_output/"

# Check if the output directory exists, create if not
if [ ! -d "$output_directory" ]; then
    mkdir -p "$output_directory"
fi

# Check if the CSV file exists
if [ ! -f "$csv_file" ]; then
    echo "The CSV file does not exist or is not accessible."
    exit 1
fi

# Check read permission for the CSV file
if [ ! -r "$csv_file" ]; then
    echo "No read permission for the CSV file."
    exit 1
fi

# Loop to read the CSV file line by line
while IFS=';' read -r column1 column2
do
    # Create markdown filename from column 1
    clean_column1="${column1//ä/ae}"
    clean_column1="${clean_column1//ö/oe}"
    clean_column1="${clean_column1//ü/ue}"
    clean_column1="${clean_column1//ß/ss}"
    clean_column1="$(echo "$clean_column1" | tr '[:upper:]' '[:lower:]' | sed -e 's/[^a-zA-Z0-9 ]//g' -e 's/  */-/g' | tr -d '"' | cut -c -100)"
    markdown_file="$output_directory$clean_column1.md"
    
    # Create markdown file and add frontmatter
    echo "---" > "$markdown_file"
    echo "title: $column1" >> "$markdown_file"
    echo "tags:" >> "$markdown_file"
    IFS=',' read -ra tags <<< "$column2"
    for tag in "${tags[@]}"; do
        echo "  - ${tag#" "}" >> "$markdown_file"
    done
    echo "---" >> "$markdown_file"
    
    # Additional processing or actions with the values can be added here
    
done < "$csv_file"
