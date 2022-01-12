$(document).ready(function () {
  const typeColor = {
    bug: "#26de81",
    dragon: "#ffeaa7",
    electric: "#fed330",
    fairy: "#FF0069",
    fighting: "#30336b",
    fire: "#f0932b",
    flying: "#81ecec",
    grass: "#00b894",
    ground: "#EFB549",
    ghost: "#a55eea",
    ice: "#74b9ff",
    normal: "#95afc0",
    poison: "#6c5ce7",
    psychic: "#a29bfe",
    rock: "#2d3436",
    water: "#0190FF",
  };

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
      beforeSend: function(){
        $('#pokeball-showup').addClass("pokeball-show");
        $('#pokeball-showup').css('display', 'flex');
        $('#pokeball-showup').css('flex-direction', 'column');
        $('#pokeball-showup').css('align-items', 'center');
        $('#pokeball-showup').css('justify-content', 'space-around');
        $('#pokeball-showup').css('font-family', 'Poppins');
        $('#pokeball-showup').css('font-size', '1.8rem');
        $('#pokeball-showup').css('font-style', 'italic');
        setTimeout(function () {
          $('#pokeball-showup-item').css('animation', 'wobble 1500ms');
          setTimeout(function () {
            $('#pokeball-showup-item').css('animation', 'tada 1500ms');
            setTimeout(function () {
              $('#pokeball-showup-item').toggle("explode");
              let hrElement;
              for (let i = 0; i < 100; i++) {
                  hrElement = document.createElement("hr");
                  hrElement.style.left = Math.floor(Math.random() * window.innerWidth) - 150 + "px";
                  hrElement.style.animationDuration = 0.2 + Math.random() * 0.3 + "s";
                  hrElement.style.animationDelay = Math.random() * 5 + "s";
                  $('#parents').append(hrElement);
              }
              $('#parents').css('display', 'flex');
              $('#parents').css('flex-direction', 'column');
              $('#parents').css('align-items', 'center');
              $('#parents').css('justify-content', 'space-around');
              $('#parents').fadeIn(1000);
              $('#pokemon_parent1_card').css('animation', 'fadeInLeft 1500ms');
              setTimeout(function () {
                $('#pokemon_parent2_card').css('animation', 'fadeInRight 1500ms');
                setTimeout(function () {
                  $('#result').fadeIn(1000);
                }, 1500)
              }, 1500)
            }, 1500)
          }, 1500)
        }, 2000);
      },
      success: function (data) {
        createPokemonCard(data.pokemon_parent1, 'pokemon_parent1', data.pokemon_hybrid.parent1_img);
        createPokemonCard(data.pokemon_parent2, 'pokemon_parent2', data.pokemon_hybrid.parent2_img);
        createPokemonCard(data.pokemon_hybrid, 'pokemon_hybrid', data.pokemon_hybrid.image);
      }
    });
  });

  $('#btn-back').click(function () {
    $('#pokeball-showup').css('display', 'none');
    $('#parents').css('display', 'none');
    $('#result').fadeOut(1000);
  });

  function createPokemonCard(element, element_string, img_name) {
    const {hp, id, name, attack, defense, speed, speedattack, speeddefense, total, type} = element;
    const card = document.getElementById(`${element_string}_card`);
    const cardThemeColor = typeColor[type.toLowerCase()];
    $(`#${element_string}_hp`).text('HP ' + hp);
    $(`#${element_string}_img`).attr("src", img_name);
    $(`#${element_string}_id`).text(`#${id}`);
    $(`#${element_string}_name`).text(name);
    $(`#${element_string}_attack`).text(attack);
    $(`#${element_string}_defense`).text(defense);
    $(`#${element_string}_speed`).text(speed);
    $(`#${element_string}_speedattack`).text(speedattack);
    $(`#${element_string}_speeddefense`).text(speeddefense);
    $(`#${element_string}_total`).text(total);
    $(`#${element_string}_type span`).text(type);
    $(`#${element_string}_id`).css('color', cardThemeColor);
    $(`#${element_string}_type span`).css('background-color', cardThemeColor);
    card.style.background = `radial-gradient(circle at 50% 0%, ${cardThemeColor} 36%, #ffffff 36%)`;
  }
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
