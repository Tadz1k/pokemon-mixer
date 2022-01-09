$(document).ready(function () {

  // // Upload Preview
  // function readURL(input) {
  //     if (input.files && input.files[0]) {
  //         let reader = new FileReader();
  //         reader.onload = function (e) {
  //             $('#imagePreview').css('background-image', 'url(' + e.target.result + ')');
  //             $('#imagePreview').hide();
  //             $('#imagePreview').fadeIn(650);
  //         }
  //         reader.readAsDataURL(input.files[0]);
  //     }
  // }
  // $("#imageUpload").change(function () {
  //     $('.image-section').show();
  //     $('#btn-predict').show();
  //     $('#result').text('');
  //     $('#result').hide();
  //     readURL(this);
  // });

  // Predict
  $('#btn-predict').click(function () {
    let form_data = new FormData($('#upload-file')[0]);
    $.ajax({
      type: 'POST',
      url: '/predict',
      data: form_data,
      contentType: false,
      cache: false,
      processData: false,
      async: true,
      success: function (data) {
        // Get and display the result
        // $('.loader').hide();
        // $('#result').fadeIn(600);
        // $('#result').text(' Result:  ' + data);
        console.log('Success!');
      },
    });
  });
  const imagesTypes = [
    "jpeg",
    "png",
    "svg",
    "gif"
  ];
  const uploadAreaContainer = document.querySelector('#upload-area-container');
  const uploadAreas = Array.from(uploadAreaContainer.children);
  uploadAreas.forEach((val, index) => {
    const dropZoon = document.querySelector(`#dropZoon-pokemon${index + 1}`);
    const loadingText = document.querySelector(`#loadingText-pokemon${index + 1}`);
    const fileInput = document.querySelector(`#fileInput-pokemon${index + 1}`);
    const fileDetails = document.querySelector(`#fileDetails-pokemon${index + 1}`);
    const uploadedFile = document.querySelector(`#uploadedFile-pokemon${index + 1}`);
    const uploadedFileInfo = document.querySelector(`#uploadedFileInfo-pokemon${index + 1}`);
    const uploadedFileName = document.querySelector(`.uploaded-file__name-pokemon${index + 1}`);
    const uploadedFileIconText = document.querySelector(`.uploaded-file__icon-text-pokemon${index + 1}`);
    const uploadedFileCounter = document.querySelector(`.uploaded-file__counter-pokemon${index + 1}`);
    dropZoon.addEventListener('dragover', (event) => {
      event.preventDefault();
      dropZoon.classList.add('drop-zoon--over');
    });
    dropZoon.addEventListener('dragleave', () => {
      dropZoon.classList.remove('drop-zoon--over');
    });
    dropZoon.addEventListener('drop', (event) => {
      event.preventDefault();
      dropZoon.classList.remove('drop-zoon--over');
      const file = event.dataTransfer.files[0];
      uploadFile(file);
    });
    dropZoon.addEventListener('click', () => {
      fileInput.click();
    });
    fileInput.addEventListener('change', (event) => {
      const file = event.target.files[0];
      uploadFile(file);
    });

    function uploadFile(file) {
      const fileReader = new FileReader();
      if (fileValidate(file.type)) {
        dropZoon.classList.add('drop-zoon--Uploaded');
        loadingText.style.display = "block";
        uploadedFile.classList.remove('uploaded-file--open');
        uploadedFileInfo.classList.remove('uploaded-file__info--active');
        fileReader.addEventListener('load', handleLoadFile);
        fileReader.readAsDataURL(file);
      }
    };

    function handleLoadFile(event) {
      setTimeout(function () {
        loadingText.style.display = "none";
        fileDetails.classList.add('file-details--open');
        uploadedFile.classList.add('uploaded-file--open');
        uploadedFileInfo.classList.add('uploaded-file__info--active');
        dropZoon.style.background = `url('${event.currentTarget.result}') no-repeat center center`;
        dropZoon.style.backgroundSize = 'contain';
        dropZoon.style.opacity = '1';
        dropZoon.style.border = '0';
      }, 500);
      progressMove();
    }

    function progressMove() {
      let counter = 0;
      setTimeout(() => {
        let counterIncrease = setInterval(() => {
          if (counter === 100) {
            clearInterval(counterIncrease);
          } else {
            counter = counter + 10;
            uploadedFileCounter.innerHTML = `${counter}%`
          }
        }, 100);
      }, 600);
    };

    function fileValidate(fileType) {
      let isImage = imagesTypes.filter((type) => fileType.indexOf(`image/${type}`) !== -1);
      if (isImage[0] === 'jpeg') uploadedFileIconText.innerHTML = 'jpg';
      else uploadedFileIconText.innerHTML = isImage[0];
      if (isImage.length !== 0) return true;
      else return alert('Please make sure to upload An Image File Type');
    };
  })
});
