function changeSabor() { // Faz uma manipulação no DOM onde ao selecionar o sabor que quer a div vai responder de acordo com o escolhido
  var sabor = document.getElementById("qtdsabor").value;
  document.getElementById(`product${sabor}`).style.display = "block";

  if (sabor == 2) {
    document.getElementById(`product1`).style.display = "none";
    document.getElementById(`product3`).style.display = "none";
    document.getElementById(`sabor2`).style.display = "block";
    document.getElementById(`sabor3`).style.display = "none";
  } else if (sabor == 3) {
    document.getElementById(`product1`).style.display = "none";
    document.getElementById(`product2`).style.display = "none";
    document.getElementById(`sabor2`).style.display = "block";
    document.getElementById(`sabor3`).style.display = "block";
  } else {
    document.getElementById(`product2`).style.display = "none";
    document.getElementById(`product3`).style.display = "none";
    document.getElementById(`sabor2`).style.display = "none";
    document.getElementById(`sabor3`).style.display = "none";
  }
}

var apisabores = [];
var total = 0;

function listar() { // Cria atráves de um requisição AJAX  a tabela  ja convertendo os valores para o BRL 
  $.ajax({
    url: "https://pizzaria.roxo.dev.br/",
    method: "get",
    success(data) {
      apisabores = data.map((sabores) => {
        return {
          id: sabores.id,
          nome: sabores.nome,
          valor: sabores.valor,
        };
      });
      $("#tabela").html("<tr><td>Sabor</td><td>Valor</td></tr>");
      apisabores.forEach(function (item) {
        var valorBR = JSON.stringify(item.valor);
        valorBR = valorBR.slice(1, length - 1);
        valorBR = valorBR.replaceAll(".", ",");

        $("#tabela").append(
          "<tr><td>" + item.nome + "</td><td>" + "R$ " + valorBR + "</td></tr>"
        );
      });
      apisabores.forEach(function (item, index) {
        $(".sabores").append(
          "<option value = '" + index + "' >" + item.nome + "</option>"
        );
      });
    },
  });
}

function montarPedido() { // A função montar pedido  faz toda logica proposta a atividade 
  $(document).ready(function () {
    var sabor1 = $("#sabor1").val();
    var sabor2 = $("#sabor2").val();
    var sabor3 = $("#sabor3").val();

    const listaindex = [sabor1, sabor2, sabor3];

    const listasabores = [];

    total = 0;

    let qtdsabor = document.getElementById("qtdsabor").value;

    for (let i = 0; i < qtdsabor; i++) {
      listasabores[i] = apisabores[listaindex[i]];
    }

    $("#pedido").html("<tr><td>Pedido</td><td>Valor</td></tr>");

    listasabores.map((sabores) => {
      var valorBR = JSON.stringify(sabores.valor);
      var valor = Number.parseFloat(sabores.valor);
      var tamanho = listasabores.length;

      calculoPedido(valor, tamanho);

      valorBR = valorBR.slice(1, length - 1);
      valorBR = valorBR.replaceAll(".", ",");

      $("#pedido").append(
        "<tr><td>" + sabores.nome + "</td><td>" + "R$ " + valorBR + "</td></tr>"
      );
    });
    $("#pedido").append(
      "<tr><td>  Total  </td><td>" + "R$ " + total.toFixed(2) + "  </td></tr>"
    );
  });
}

function calculoPedido(valor, tamanho) { // a Função calculoPedido faz o calculo de acordo com o valor e o tamanho da Pizza proposto na atividade
  total += valor / tamanho;
}

listar();
