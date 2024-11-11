#!/bin/bash

# Initialize base directory for fragments
BASE_DIR="input_fragments"

# List of resume types and their respective subdirectories
declare -A RESUME_TYPES=(
    ["Python_LLM_RAG"]="experience skills"
    ["Private_Sector_IT"]="experience skills"
    ["Data_Engineer"]="experience skills"
    ["Cloud_Engineer"]="experience skills"
    ["Machine_Learning_Big_Data"]="experience skills"
    ["Gov_Contractor_Python"]="experience skills"
    ["Gov_Contractor_Dotnet"]="experience skills"
    ["Gov_Contractor_Data_Engineer"]="experience skills"
    ["Gov_Contractor_Cloud_Engineer"]="experience skills"
    ["Gov_Contractor_Tech_Lead"]="experience skills"
    ["Legacy_Mainframe_Support"]="experience skills"
)

# Create base directory if it doesn't exist
if [ ! -d "$BASE_DIR" ]; then
    echo "Creating base directory: $BASE_DIR"
    mkdir -p "$BASE_DIR"
else
    echo "Base directory already exists: $BASE_DIR"
fi

# Function to create .docx file using Python
create_docx_file() {
    local file_path="$1"
    python - <<EOF
import sys
from docx import Document
file_path = '$1'
document = Document()
document.add_paragraph('')  # Initialize empty document
document.save(file_path)
EOF
}

# Create a common education.docx file
EDUCATION_DOCX="$BASE_DIR/education.docx"
if [ ! -f "$EDUCATION_DOCX" ]; then
    echo "Creating common education file: $EDUCATION_DOCX"
    create_docx_file "$EDUCATION_DOCX"
else
    echo "Common education file already exists: $EDUCATION_DOCX"
fi

# Function to create directories and .docx files for each resume type
create_fragments() {
    local dir="$BASE_DIR/$1"
    local sections="$2"

    # Create resume type directory
    if [ ! -d "$dir" ]; then
        echo "Creating directory for resume type: $dir"
        mkdir -p "$dir"
    else
        echo "Directory already exists: $dir"
    fi

    # Create default section files if they don't exist
    for section in $sections; do
        local file="$dir/$section.docx"
        if [ ! -f "$file" ]; then
            echo "Creating file: $file"
            create_docx_file "$file"
        else
            echo "File already exists: $file"
        fi
    done
}

# Loop through the resume types and create the structure
for resume_type in "${!RESUME_TYPES[@]}"; do
    create_fragments "$resume_type" "${RESUME_TYPES[$resume_type]}"
done

echo "Initialization complete!"
