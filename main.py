from fastapi import FastAPI, Request, UploadFile, File
from fastapi.staticfiles import StaticFiles
from fastapi.templating import Jinja2Templates
from pathlib import Path
from starlette.responses import StreamingResponse
from fastapi.responses import JSONResponse, HTMLResponse
from typing import List
import cv2
import io
import os

app = FastAPI()

app.mount(
    "/static",
    StaticFiles(directory=Path(__file__).parent.parent.absolute() / "static"),
    name="static",
)

templates = Jinja2Templates(directory="templates")
# uvicorn app.main:app --reload

@app.get("/")
async def root(request: Request):
    return templates.TemplateResponse(
        "index.html", {"request": request}
    )
  

#########################
@app.post("/files/")
async def create_files(files: List[bytes] = File(...)):
    print('files endpoint')
    return {"file_sizes": [len(file) for file in files]}


@app.post("/uploadfiles/")
async def create_upload_files(files: List[UploadFile] = File(...)):
    return {"filenames": [file.filename for file in files]}


@app.get("/test2")
async def main():
    content = """
<body>
<form action="/upload/" enctype="multipart/form-data" method="post">
<input name="files" type="file" multiple>
<input type="submit">
</form>
<form action="/uploadfiles/" enctype="multipart/form-data" method="post">
<input name="files" type="file" multiple>
<input type="submit">
</form>
</body>
    """
    return HTMLResponse(content=content)
#########################3

# add upload image
@app.post("/upload")
async def upload_file(file: UploadFile = File(...)):
    image_path = os.path.join('images', file.filename)
    # app\images\demo.png
    with open(image_path, 'wb') as image:
        content = await file.read()
        image.write(content)
        image.close()

    # pred_main = baslinemodel.predict(image_path)
    # baslinemodel.vis_segmentation(image_path, pred_main, file.filename)

    # pred_path = 'filename2.png'
    # pred_path = os.path.join('predictions', file.filename)
    pred_path = os.path.join('images', file.filename)
    im_png = cv2.imread(pred_path)
    res, im_png = cv2.imencode(".png", im_png)
    return StreamingResponse(io.BytesIO(im_png.tobytes()), media_type="image/png")


@app.get("/test")
async def root():
    content = """
        <body>
            <form action="/upload/" enctype="multipart/form-data" method="post">
                <input name="files" type="file">
                <input type="submit">
            </form>
        </body>
    """
    return HTMLResponse(content=content)


# from fastapi import FastAPI, HTTPException
# from starlette.responses import Response

# from app.db.models import UserAnswer
# from app.api import api

# app = FastAPI()


# @app.get("/")
# def root():
#     return {"message": "Fast API in Python"}


# @app.get("/user")
# def read_user():
#     return api.read_user()


# @app.get("/question/{position}", status_code=200)
# def read_questions(position: int, response: Response):
#     question = api.read_questions(position)

#     if not question:
#         raise HTTPException(status_code=400, detail="Error")

#     return question


# @app.get("/alternatives/{question_id}")
# def read_alternatives(question_id: int):
#     return api.read_alternatives(question_id)


# @app.post("/answer", status_code=201)
# def create_answer(payload: UserAnswer):
#     payload = payload.dict()

#     return api.create_answer(payload)


# @app.get("/result/{user_id}")
# def read_result(user_id: int):
#     return api.read_result(user_id)
