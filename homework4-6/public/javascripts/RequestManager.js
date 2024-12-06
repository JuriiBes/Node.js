class RequestManager {
  static async deleteRequest(route, body) {
    const response = await fetch(route, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });
    // console.log(response);
    if (response.ok === true) {
      window.location.reload(true);
      return;
    } else {
      console.log('Error operation "Delete"');
    }
  }

  static checkAddFile(event) {
    RequestManager.handleFileSelect(event, ".create__img-icon");
  }

  static handleFileSelect(event, imgSelector) {
    const file = event.target.files[0];
    if (file && file.type.startsWith("image/")) {
      const reader = new FileReader();
      reader.onload = function (e) {
        const imgElement = document.querySelector(imgSelector);
        imgElement.src = e.target.result;
      };
      reader.readAsDataURL(file);
    }
  }
}
