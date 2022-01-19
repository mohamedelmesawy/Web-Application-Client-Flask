from flask import Flask, render_template, request


app = Flask(__name__)


@app.route("/")
def list():
    return render_template("index.html")

@app.get("/about.html")
def list():
    return render_template("about.html")  

# @app.route('/predict', methods=["POST"])
# def predict():
#     return render_template("index.html", result=result)


if __name__ == "__main__":
    app.run()
    
    