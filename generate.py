import os
from pathlib import Path
from docx import Document
import argparse
import logging

LOGGER = logging.getLogger(__name__)
logging.basicConfig(level=logging.INFO)


def read_docx(file_path: Path) -> Document:
    """Reads a .docx file and returns its Document object.

    Args:
        file_path (Path): The path to the .docx file.

    Returns:
        Document: The Document object containing the file's contents.
    """
    if not file_path.exists():
        LOGGER.error(f"File not found: {file_path}")
        raise FileNotFoundError(f"File not found: {file_path}")

    LOGGER.info(f"Reading file: {file_path}")
    return Document(file_path)


def merge_documents(documents: list[Document]) -> Document:
    """Merges multiple Document objects into one.

    Args:
        documents (list[Document]): A list of Document objects to be merged.

    Returns:
        Document: A single merged Document object.
    """
    merged_doc = Document()

    for i, doc in enumerate(documents):
        # if i > 0:
        #     # Add a page break between different sections
        #     merged_doc.add_page_break()
        #     print("break")
        for element in doc.element.body:
            print("element")
            merged_doc.element.body.append(element)

    return merged_doc


def generate_resume(resume_name: str, fragments_dir: Path, education_file: Path, output_dir: Path) -> None:
    """Generates a resume in DOCX format using the provided fragments.

    Args:
        resume_name (str): The name of the resume.
        fragments_dir (Path): The directory containing the specific fragments for the resume.
        education_file (Path): The path to the common education file.
        output_dir (Path): The output directory to save the generated DOCX file.
    """
    try:
        # Read specific fragments for the resume
        experience_doc = read_docx(fragments_dir / 'experience.docx')
        skills_doc = read_docx(fragments_dir / 'skills.docx')

        # Read the common education fragment
        education_doc = read_docx(education_file)

        # Merge all documents (order matters: experience, skills, education)
        merged_doc = merge_documents([experience_doc, skills_doc, education_doc])

        # Save the generated resume
        output_path = output_dir / f"{resume_name}.docx"
        merged_doc.save(output_path)

        LOGGER.info(f"Generated resume '{resume_name}' at {output_path}.")

    except Exception as e:
        LOGGER.error(f"Failed to generate resume '{resume_name}': {e}")


def generate_resumes(input_dir: Path, education_file: Path, output_dir: Path) -> None:
    """Generates resumes for all subdirectories in the input directory.

    Args:
        input_dir (Path): The input directory containing subdirectories with resume fragments.
        education_file (Path): The path to the common education file.
        output_dir (Path): The output directory where generated resumes will be saved.
    """
    for resume_type_dir in input_dir.iterdir():
        if resume_type_dir.is_dir():
            resume_name = resume_type_dir.name.replace('_', ' ')
            generate_resume(resume_name, resume_type_dir, education_file, output_dir)


def main() -> None:
    """Main function to parse arguments and generate resumes."""
    parser = argparse.ArgumentParser(description="Generate resumes from .docx fragments.")
    parser.add_argument(
        "--input-dir",
        type=Path,
        default=Path("./input_fragments"),
        help="Directory containing input .docx fragments."
    )
    parser.add_argument(
        "--output-dir",
        type=Path,
        default=Path("./generated_resumes"),
        help="Directory to save generated resumes."
    )
    parser.add_argument(
        "--education-file",
        type=Path,
        default=Path("./input_fragments/education.docx"),
        help="Path to the common education .docx file."
    )
    args = parser.parse_args()

    input_dir = args.input_dir
    output_dir = args.output_dir
    education_file = args.education_file

    if not input_dir.exists() or not input_dir.is_dir():
        LOGGER.error(f"Input directory '{input_dir}' does not exist or is not a directory.")
        return

    if not education_file.exists() or not education_file.is_file():
        LOGGER.error(f"Education file '{education_file}' does not exist or is not a file.")
        return

    output_dir.mkdir(parents=True, exist_ok=True)

    generate_resumes(input_dir, education_file, output_dir)


if __name__ == "__main__":
    main()
