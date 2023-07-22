let candy = document.querySelector("#candy");
let desc = document.querySelector("#desc");
let price = document.querySelector("#price");
let quantity = document.querySelector("#quant");
let btn = document.querySelector("#button");
let datatable = document.querySelector("#user-table");
// CrudCrud url
let url =
  "https://crudcrud.com/api/d7d23a5546a3429d88461c8dd953bceb/candy_Shop";

btn.addEventListener("click", (e) => {
  e.preventDefault();

  let row = document.createElement("tr");
  let candycell = document.createElement("td");
  let desccell = document.createElement("td");
  let pricecell = document.createElement("td");
  let quantitycell = document.createElement("td");
  let optioncell = document.createElement("td");

  // BUy button create
  let buyone = document.createElement("button");
  let buytwo = document.createElement("button");
  let buythree = document.createElement("button");

  buyone.textContent = "Buy One";
  buytwo.textContent = "Buy Two";
  buythree.textContent = "Buy Three";

  buyone.classList.add("button1");
  buytwo.classList.add("button1");
  buythree.classList.add("button1");

  // Value append in row
  candycell.textContent = candy.value;
  desccell.textContent = desc.value;
  pricecell.textContent = price.value;
  quantitycell.textContent = quantity.value;

  optioncell.appendChild(buyone);
  optioncell.appendChild(buytwo);
  optioncell.appendChild(buythree);

  row.appendChild(candycell);
  row.appendChild(desccell);
  row.appendChild(pricecell);
  row.appendChild(quantitycell);
  row.appendChild(optioncell);

  datatable.appendChild(row);

  // Send data to CrudCrud.
  let obj = {
    Candy: candy.value,
    Description: desc.value,
    Price: price.value,
    Quantity: quantity.value,
  };

  axios
    .post(url, obj)
    .then((res) => {
      console.log("Candy details is", res);
    })
    .catch((err) => {
      console.log(err);
    });

  // Updating quantity in cart according to buy candy.
  buyone.addEventListener("click", () => {
    if (quantitycell.textContent !== 0 && quantitycell.textContent > 0)
      quantitycell.textContent = quantitycell.textContent - 1;
    else alert("No More Candy Availaible");
  });
  buytwo.addEventListener("click", () => {
    if (quantitycell.textContent !== 0 && quantitycell.textContent > 0)
      quantitycell.textContent = quantitycell.textContent - 2;
    else alert("No More Candy Availaible");
  });
  buythree.addEventListener("click", () => {
    if (quantitycell.textContent !== 0 && quantitycell.textContent > 0)
      quantitycell.textContent = quantitycell.textContent - 3;
    else alert("No More Candy Availaible");
  });

  // Update Data in crudcrud
  buyone.addEventListener("click", getparentdata);
  buytwo.addEventListener("click", getparentdata);
  buythree.addEventListener("click", getparentdata);

  async function getparentdata(event) {
    let data = event.target.parentElement.parentElement;
    let name = data.children[0].textContent;
    try {
      let res = await findDataId();
      let filterdata = res.filter((eachrow) => eachrow.Candy === name);
      let id = filterdata[0]._id;
      update(id);
    } catch (err) {
      console.log("error", err);
    }
  }

  async function update(id) {
    try {
      await axios.put(
        `https://crudcrud.com/api/d7d23a5546a3429d88461c8dd953bceb/candy_Shop/${id}`,
        {
          Candy: candycell.textContent,
          Description: desccell.textContent,
          Price: pricecell.textContent,
          Quantity: quantitycell.textContent,
        }
      );
    } catch (err) {
      console.log("erro", err);
    }
  }

  // Function Get Id from CrudCrud
  async function findDataId() {
    try {
      let res = await axios.get(url);
      return res.data;
    } catch (error) {
      console.log(error);
    }
  }
});

// On reload page we want data from crudcrud
window.addEventListener("DOMContentLoaded", () => {
  axios.get(url).then((res) => {
    for (var i = 0; i < res.data.length; i++) {
      let row = document.createElement("tr");
      let candycell = document.createElement("td");
      let desccell = document.createElement("td");
      let pricecell = document.createElement("td");
      let quantitycell = document.createElement("td");
      let optioncell = document.createElement("td");

      // BUy button create
      let buyone = document.createElement("button");
      let buytwo = document.createElement("button");
      let buythree = document.createElement("button");

      buyone.textContent = "Buy One";
      buytwo.textContent = "Buy Two";
      buythree.textContent = "Buy Three";

      buyone.classList.add("button1");
      buytwo.classList.add("button1");
      buythree.classList.add("button1");

      // Value append in row
      candycell.textContent = res.data[i].Candy;
      desccell.textContent = res.data[i].Description;
      pricecell.textContent = res.data[i].Price;
      quantitycell.textContent = res.data[i].Quantity;

      optioncell.appendChild(buyone);
      optioncell.appendChild(buytwo);
      optioncell.appendChild(buythree);

      row.appendChild(candycell);
      row.appendChild(desccell);
      row.appendChild(pricecell);
      row.appendChild(quantitycell);
      row.appendChild(optioncell);

      datatable.appendChild(row);

      // Updating quantity in cart according to buy candy.
      buyone.addEventListener("click", () => {
        if (quantitycell.textContent !== 0 && quantitycell.textContent > 0)
          quantitycell.textContent = quantitycell.textContent - 1;
        else alert("No More Candy Availaible");
      });
      buytwo.addEventListener("click", () => {
        if (quantitycell.textContent !== 0 && quantitycell.textContent > 0)
          quantitycell.textContent = quantitycell.textContent - 2;
        else alert("No More Candy Availaible");
      });
      buythree.addEventListener("click", () => {
        if (quantitycell.textContent !== 0 && quantitycell.textContent > 0)
          quantitycell.textContent = quantitycell.textContent - 3;
        else alert("No More Candy Availaible");
      });

      // Update Data in crudcrud
      buyone.addEventListener("click", getparentdata);
      buytwo.addEventListener("click", getparentdata);
      buythree.addEventListener("click", getparentdata);

      async function getparentdata(event) {
        let data = event.target.parentElement.parentElement;
        let name = data.children[0].textContent;
        try {
          let res = await findDataId();
          let filterdata = res.filter((eachrow) => eachrow.Candy === name);
          let id = filterdata[0]._id;
          update(id);
        } catch (err) {
          console.log("error", err);
        }
      }

      async function update(id) {
        try {
          await axios.put(
            `https://crudcrud.com/api/d7d23a5546a3429d88461c8dd953bceb/candy_Shop/${id}`,
            {
              Candy: candycell.textContent,
              Description: desccell.textContent,
              Price: pricecell.textContent,
              Quantity: quantitycell.textContent,
            }
          );
        } catch (err) {
          console.log("erro", err);
        }
      }

      // Function Get Id from CrudCrud
      async function findDataId() {
        try {
          let res = await axios.get(url);
          return res.data;
        } catch (error) {
          console.log(error);
        }
      }
    }
  });
});
