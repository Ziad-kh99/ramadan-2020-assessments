function singleVidReq(vidReqInfo) {
    const vidContainerElm = document.createElement('div');
    vidContainerElm.innerHTML = `
    <div class="card mb-3">
      <div class="card-body d-flex justify-content-between flex-row">
        <div class="d-flex flex-column">
          <h3>${vidReqInfo.topic_title}</h3>
          <p class="text-muted mb-2">${vidReqInfo.topic_details}</p>
          <p class="mb-0 text-muted">
            <strong>Expected results:</strong> ${vidReqInfo.expected_result}
          </p>
        </div>
        <div class="d-flex flex-column text-center">
          <a class="btn btn-link">🔺</a>
          <h3>0</h3>
          <a class="btn btn-link">🔻</a>
        </div>
      </div>
      <div class="card-footer d-flex flex-row justify-content-between">
        <div>
          <span class="text-info">${vidReqInfo.status.toUpperCase()}</span>
          &bullet; added by <strong>${vidReqInfo.author_name}</strong> on
          <strong>${new Date(vidReqInfo.submit_date).toLocaleDateString()}</strong>
        </div>
        <div class="d-flex justify-content-center flex-column 408ml-auto mr-2">
          <div class="badge badge-success">
            ${vidReqInfo.target_level}
          </div>
        </div>
      </div>
    </div>
    `;

    return vidContainerElm;
}

document.addEventListener('DOMContentLoaded', () => {
    const formVidReqElm = document.getElementById('formVideoRequest');
    const listOfVidElm = document.getElementById('listOfRequests');


    //> Show list of requests below the form (GET => '/video-request'):
    fetch('http://localhost:7777/video-request')
        .then((blob) => blob.json())
        .then((data) => {
            data.forEach((vidReqInfo) => {
                listOfVidElm.appendChild(singleVidReq(vidReqInfo));
            })
        });


    //> Submit a video request (POST => '/video-request')
    formVidReqElm.addEventListener("submit", (e) => {
      e.preventDefault();

      const formData = new FormData(formVidReqElm);

      fetch("http://localhost:7777/video-request", {
        method: 'POST', 
        body: formData
      }).then((data) => {
          console.log(data);
        });
    })
})