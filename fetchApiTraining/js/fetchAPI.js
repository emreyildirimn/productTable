const link = "https://fakestoreapi.com/products"
const loader = document.querySelector("#loading")
let buttonDom;
let tableDom = document.getElementById("products")
let tableContent = `<tr>
                        <th scope="col">ID</th>
                        <th scope="col">Title</th>
                        <th scope="col">Price</th>
                        <th scope="col">Description</th>
                        <th scope="col">Category</th>;
                        <th scope="col"></th>
                    </tr>`;

function buttonClick(clicked_id) {
  buttonDom = document.querySelector(`[id='${clicked_id}']`)

  if (localStorage.getItem(clicked_id) == "true") {
    localStorage.removeItem(clicked_id)
    buttonDom.setAttribute("class", 'btn btn-outline-success')
    buttonDom.innerHTML = "Favori Ekle"

  } else {
    localStorage.setItem(clicked_id, true);
    buttonDom.setAttribute("class", 'btn btn-outline-danger')
    buttonDom.innerHTML = "Favori Sil"
  }
}

fetch(link)
  .then(response => response.json(), displayLoading()
  )
  .then(responseJson => {
    responseJson.forEach(item => {
      hideLoading()
      tableContent += `<tr>
        <td scope="row">${item.id}</td>
        <td>${item.title} </td>
        <td>${item.price}</td>
        <td>${item.description}</td>
        <td>${item.category}</td>`
      if (localStorage.getItem(item.id) == "true") {
        tableContent += `<td><button type="button" class="btn btn-outline-danger" id="${item.id}" 
        onClick="buttonClick(${item.id})">Favori Sil</button></td></tr>`
      } else {
        tableContent += `<td><button type="button" class="btn btn-outline-success" id="${item.id}" 
        onClick="buttonClick(${item.id})">Favori Ekle</button></td></tr>`
      }


    });
    tableDom.innerHTML = tableContent
  })

function displayLoading() {
  loader.classList.add("display")
  // to stop loading after some time
  setTimeout(() => {
      loader.classList.remove("display")
  }, 10000);
}

function hideLoading() {
  loader.classList.remove("display")
}

