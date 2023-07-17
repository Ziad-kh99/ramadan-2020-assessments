function singleVidReq(vidReqInfo) {
    const vidContainerElm = document.createElement('div');
    vidContainerElm.innerHTML = `
    <div class="card mb-3">
      <div class="card-body d-flex justify-content-between flex-row">
        <div class="d-flex flex-column">
          <h3>${vidReqInfo.topic_title}</h3>
          <p class="text-muted mb-2">${vidReqInfo.topic_details}</p>
          <p class="mb-0 text-muted">
            ${ 
              vidReqInfo.expected_result &&
                `<strong>Expected results:</strong> ${vidReqInfo.expected_result}`
            }
          </p>
        </div>
        <div class="d-flex flex-column text-center">
          <a class="btn btn-link" id="votes_ups_${vidReqInfo._id}">🔺</a>
          <h3 id="score_vote_${vidReqInfo._id}">
            ${vidReqInfo.votes.ups - vidReqInfo.votes.downs}
          </h3>
          <a class="btn btn-link" id="votes_downs_${vidReqInfo._id}" >🔻</a>
        </div>
      </div>
      <div class="card-footer d-flex flex-row justify-content-between">
        <div>
          <span class="text-info">${vidReqInfo.status.toString().toUpperCase()}</span>
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


    // console.log(voteUpElm);
    // console.log(voteDowun);


    //> Show list of requests below the form (GET => '/video-request'):
    fetch('http://localhost:7777/video-request')
        .then((blob) => blob.json())
        .then((data) => {
            data.forEach((vidReqInfo) => {  
                listOfVidElm.appendChild(singleVidReq(vidReqInfo));

                const voteUpElm = document.getElementById(`votes_ups_${vidReqInfo._id}`);
                const voteDowunElm = document.getElementById(`votes_downs_${vidReqInfo._id}`);
                const scoreVote = document.getElementById(`score_vote_${vidReqInfo._id}`);

                voteUpElm.addEventListener('click', (e) => {
                  fetch('http://localhost:7777/video-request/vote', {
                    method: 'PUT',
                    headers: { 'content-Type': 'application/json' },
                    body: JSON.stringify({
                      id: vidReqInfo._id,
                      vote_type: 'ups'
                    })
                  }).then((blob) => blob.json())
                    .then((data) => {
                      scoreVote.innerText = data.ups - data.downs;
                    })
                });

                voteDowunElm.addEventListener('click', (e) => {
                  fetch('http://localhost:7777/video-request/vote', {
                    method: 'PUT',
                    headers: { 'content-Type': 'application/json'},
                    body: JSON.stringify({
                      id: vidReqInfo._id,
                      vote_type: 'downs'
                    })
                  }).then((blob) => blob.json())
                    .then((data) => {
                      scoreVote.innerHTML = data.ups - data.downs;
                    })
                });

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
          listOfVidElm.prepend(singleVidReq(data));
        });
    })


    //> Vote up and down in each request:



})

