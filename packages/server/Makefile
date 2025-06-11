.PHONY: dev check format

dev:
	uv run uvicorn main:app --reload

check:
	uv run ruff check .

format:
	uv run ruff format .
