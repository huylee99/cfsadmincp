const list = document.querySelector(".confession-list");
const card = document.querySelector(".card");

const showList = (data) => {
  if (data !== null) {
    const confession = data.data();
    const time = moment(confession.created_at.toDate()).fromNow();
    const li = `<li data-id="${data.id}">
            <a href="#" class="list-group-item list-group-item-action">
                <div class="d-flex w-100 justify-content-between">
                    <small class="text-muted">${time}</small>
                </div>
                <p class="mb-1">Gửi tới ${confession.recipient}: <br/> ${confession.message}</p>
                <button type="button" class="btn btn-danger style-btn" id="delete">Xóa</button><button type="button" class="btn btn-primary" id="copy">Copy</button>
            </a>
            </li>`;
    list.innerHTML += li;
  }
};

list.addEventListener("click", (e) => {
  e.preventDefault();
  if (e.target.getAttribute("id") === "delete") {
    if (confirm("Xóa confession?")) {
      let id = e.target.parentElement.parentElement.getAttribute("data-id");
      db.collection("confession").doc(id).delete();
      e.target.parentElement.parentElement.remove();
    }
  }
});

list.addEventListener("click", (e) => {
  e.preventDefault();
  if (e.target.getAttribute("id") === "copy") {
    let input = document.createElement("input");
    document.body.appendChild(input);
    input.value =
      e.target.previousElementSibling.previousElementSibling.textContent;
    input.select();
    input.setSelectionRange(0, 99999);
    document.execCommand("copy", false);
    input.remove();
  }
});
