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
      success: function (data) {
        $('#result').fadeIn(600);
        const parent1card = document.getElementById("pokemon_parent1_card");
        const parent1CardThemeColor = typeColor[data.pokemon_parent1.type.toLowerCase()];
        $('#pokemon_parent1_hp').text('HP ' + data.pokemon_parent1.hp);
        $("#pokemon_parent1_img").attr("src",data.pokemon_parent1.image);
        $('#pokemon_parent1_id').text(`#${data.pokemon_parent1.id}`);
        $('#pokemon_parent1_name').text(data.pokemon_parent1.name);
        $("#pokemon_parent1_attack").text(data.pokemon_parent1.attack);
        $("#pokemon_parent1_defense").text(data.pokemon_parent1.defense);
        $("#pokemon_parent1_speed").text(data.pokemon_parent1.speed);
        $("#pokemon_parent1_speedattack").text(data.pokemon_parent1.speedattack);
        $("#pokemon_parent1_speeddefense").text(data.pokemon_parent1.speeddefense);
        $("#pokemon_parent1_total").text(data.pokemon_parent1.total);
        $('#pokemon_parent1_type span').text(data.pokemon_parent1.type);
        $('#pokemon_parent1_id').css('color', parent1CardThemeColor);
        $('#pokemon_parent1_type span').css('background-color', parent1CardThemeColor);
        parent1card.style.background = `radial-gradient(circle at 50% 0%, ${parent1CardThemeColor} 36%, #ffffff 36%)`;

        const parent2card = document.getElementById("pokemon_parent2_card");
        const parent2CardThemeColor = typeColor[data.pokemon_parent2.type.toLowerCase()];
        $('#pokemon_parent2_hp').text('HP ' + data.pokemon_parent2.hp);
        $("#pokemon_parent2_img").attr("src",data.pokemon_parent2.image);
        $('#pokemon_parent2_id').text(`#${data.pokemon_parent2.id}`);
        $('#pokemon_parent2_name').text(data.pokemon_parent2.name);
        $("#pokemon_parent2_attack").text(data.pokemon_parent2.attack);
        $("#pokemon_parent2_defense").text(data.pokemon_parent2.defense);
        $("#pokemon_parent2_speed").text(data.pokemon_parent2.speed);
        $("#pokemon_parent2_speedattack").text(data.pokemon_parent2.speedattack);
        $("#pokemon_parent2_speeddefense").text(data.pokemon_parent2.speeddefense);
        $("#pokemon_parent2_total").text(data.pokemon_parent2.total);
        $('#pokemon_parent2_type span').text(data.pokemon_parent2.type);
        $('#pokemon_parent2_id').css('color', parent2CardThemeColor);
        $('#pokemon_parent2_type span').css('background-color', parent2CardThemeColor);
        parent2card.style.background = `radial-gradient(circle at 50% 0%, ${parent2CardThemeColor} 36%, #ffffff 36%)`;


        const hybridcard = document.getElementById("pokemon_hybrid_card");
        const hybridCardThemeColor = typeColor[data.pokemon_hybrid.type.toLowerCase()];
        $('#pokemon_hybrid_hp').text('HP ' + data.pokemon_hybrid.hp);
        $("#pokemon_hybrid_img").attr("src",data.pokemon_hybrid.image);
        $('#pokemon_hybrid_id').text(`#${data.pokemon_hybrid.id}`);
        $('#pokemon_hybrid_name').text(data.pokemon_hybrid.name);
        $("#pokemon_hybrid_attack").text(data.pokemon_hybrid.attack);
        $("#pokemon_hybrid_defense").text(data.pokemon_hybrid.defense);
        $("#pokemon_hybrid_speed").text(data.pokemon_hybrid.speed);
        $("#pokemon_hybrid_speedattack").text(data.pokemon_hybrid.speedattack);
        $("#pokemon_hybrid_speeddefense").text(data.pokemon_hybrid.speeddefense);
        $("#pokemon_hybrid_total").text(data.pokemon_hybrid.total);
        $('#pokemon_hybrid_type span').text(data.pokemon_hybrid.type);
        $('#pokemon_hybrid_id').css('color', hybridCardThemeColor);
        $('#pokemon_hybrid_type span').css('background-color', hybridCardThemeColor);
        hybridcard.style.background = `radial-gradient(circle at 50% 0%, ${hybridCardThemeColor} 36%, #ffffff 36%)`;
      }
    });
  });
  $('#btn-back').click(function () {
        $('#result').fadeOut(1000);
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
