from fastapi import FastAPI

app = FastAPI(
    title="FastAPI Starter",
    version="0.1.0",
)


@app.get("/")
def root():
    return {"message": "FastAPI is running"}


@app.get("/health")
def health():
    return {"status": "ok"}
