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
    const firstSelect = new SlimSelect({select: '#pokemon1-battle-select'});
    const secondSelect = new SlimSelect({select: '#pokemon2-battle-select'});

    $.get("/pokedexData", function( data ) {
        window.pokedex = data;
        const firstSelectData = pokedex.pokedexData.map((pokemon) => {
           return {
                value: pokemon.id,
                text: `#${pokemon.id} ${pokemon.name}, ${pokemon.type} Total: ${pokemon.total}`,
                disabled: pokemon.id === "1"
            };
        });
        const secondSelectData = pokedex.pokedexData.map((pokemon) => {
            return {
                 value: pokemon.id,
                 text: `#${pokemon.id} ${pokemon.name}, ${pokemon.type} Total: ${pokemon.total}`,
                 disabled: pokemon.id === "0",
                 selected: pokemon.id === "1"
             };
         });
        firstSelect.setData(firstSelectData);
        secondSelect.setData(secondSelectData);
        $("#pokemon1-battle-select").val(0).change();
        $("#pokemon2-battle-select").val(1).change();
    });
    $("#pokemon1-battle-select").on("change",function() {
        const pokemon = pokedex.pokedexData.find(pokemon => pokemon.id === $(this).val());
        const card = document.getElementById(`pokemon1_battle_card`);
        const {hp, id, name, attack, defense, speed, speedattack, speeddefense, total, type, image} = pokemon;
        const cardThemeColor = pokedex.typeColor[type.split(' ')[0].toLowerCase()];
        $('#pokemon1_battle_hp').text('HP ' + hp);
        $('#pokemon1_battle_img').attr("src", image);
        $('#pokemon1_battle_id').text(`#${id}`);
        $('#pokemon1_battle_name').text(name);
        $('#pokemon1_battle_attack').text(attack);
        $('#pokemon1_battle_defense').text(defense);
        $('#pokemon1_battle_speed').text(speed);
        $('#pokemon1_battle_speedattack').text(speedattack);
        $('#pokemon1_battle_speeddefense').text(speeddefense);
        $('#pokemon1_battle_total').text(total);
        $('#pokemon1_battle_type span').text(type);
        $('#pokemon1_battle_id').css('color', cardThemeColor);
        $('#pokemon1_battle_type span').css('background-color', cardThemeColor);
        card.style.background = `radial-gradient(circle at 50% 0%, ${cardThemeColor} 36%, #ffffff 36%)`;
        secondSelect.setData(pokedex.pokedexData.map((pokemon) => {
            return {
                 value: pokemon.id,
                 text: `#${pokemon.id} ${pokemon.name}, ${pokemon.type} Total: ${pokemon.total}`,
                 disabled: pokemon.id === id,
                 selected: pokemon.id === secondSelect.selected()
             };
         }))
    });

    $("#pokemon2-battle-select").on("change",function() {
        const pokemon = pokedex.pokedexData.find(pokemon => pokemon.id === $(this).val());
        const card = document.getElementById(`pokemon2_battle_card`);
        const {hp, id, name, attack, defense, speed, speedattack, speeddefense, total, type, image} = pokemon;
        const cardThemeColor = pokedex.typeColor[type.split(' ')[0].toLowerCase()];
        $('#pokemon2_battle_hp').text('HP ' + hp);
        $('#pokemon2_battle_img').attr("src", image);
        $('#pokemon2_battle_id').text(`#${id}`);
        $('#pokemon2_battle_name').text(name);
        $('#pokemon2_battle_attack').text(attack);
        $('#pokemon2_battle_defense').text(defense);
        $('#pokemon2_battle_speed').text(speed);
        $('#pokemon2_battle_speedattack').text(speedattack);
        $('#pokemon2_battle_speeddefense').text(speeddefense);
        $('#pokemon2_battle_total').text(total);
        $('#pokemon2_battle_type span').text(type);
        $('#pokemon2_battle_id').css('color', cardThemeColor);
        $('#pokemon2_battle_type span').css('background-color', cardThemeColor);
        card.style.background = `radial-gradient(circle at 50% 0%, ${cardThemeColor} 36%, #ffffff 36%)`;
        firstSelect.setData(pokedex.pokedexData.map((pokemon) => {
            return {
                 value: pokemon.id,
                 text: `#${pokemon.id} ${pokemon.name}, ${pokemon.type} Total: ${pokemon.total}`,
                 disabled: pokemon.id === id,
                 selected: pokemon.id === firstSelect.selected()
             };
         }))
    });

    $('#pokedexLink').click(function(){
        let url = $(this).attr('href');
        $('body').css('animation', 'backOutRight 3000ms');
        setTimeout(function() {
            document.location.href = url;
        }, 1000);
        return false;
      });

    $('#homeLink').click(function(){
        let url = $(this).attr('href');
        $('body').css('animation', 'backOutRight 3000ms');
        setTimeout(function() {
            document.location.href = url;
        }, 1000);
        return false;
    });

    $('#btn-battleScore').click(function () {
        let form_data = new FormData($('#upload-file')[0]);
        const ids = $('form').serializeArray();
        console.log(ids);
        $.ajax({
          type: 'POST',
          url: '/battle',
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
            const [winner_id, winner, probability] = data.pokemon_data;
            const pokemon1 = pokedex.pokedexData.find(pokemon => pokemon.id === ids[0].value );
            const pokemon2 = pokedex.pokedexData.find(pokemon => pokemon.id === ids[1].value );
            $(`#winner_text`).text(`The winner is ${winner.name} with probability of ${probability}% 🥊🥊🥊`);
            createPokemonCard(pokemon1, 'pokemon_parent1');
            createPokemonCard(pokemon2, 'pokemon_parent2');
            createPokemonCard(winner, 'pokemon_winner');
          }
        });
    });

    function createPokemonCard(element, element_string, img_element) {
        const {hp, id, name, attack, defense, speed, speedattack, speeddefense, total, type, image } = element;
        const card = document.getElementById(`${element_string}_card`);
        const cardThemeColor = typeColor[type.toLowerCase()];
        $(`#${element_string}_hp`).text('HP ' + hp);
        $(`#${element_string}_img`).attr("src", image);
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

      $('#btn-back').click(function () {
        $('#pokeball-showup').css('display', 'none');
        $('#parents').css('display', 'none');
        $('#result').fadeOut(1000);
      });
});