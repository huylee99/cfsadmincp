// get data
auth.onAuthStateChanged((user) => {
  if (user) {
    db.collection("confession")
    .orderBy('created_at')
    .onSnapshot((snapshot) => {
      snapshot.docChanges().forEach((change) => {
        if (change.type === "added") {
          showList(change.doc);
        }
      });
    });
    loginForm.style.display = "none";
    card.style.display = "block";
  } else {
    card.style.display = "none";
    logout.style.display = "none";
    loginForm.style.display = "block";
  }
});

const logout = document.querySelector("#logout");
logout.addEventListener("click", (e) => {
  e.preventDefault();
  auth.signOut().then(() => {
    alert("Đã đăng xuất");
    loginForm.style.display = "block";
    card.style.display = "none";
    logout.style.display = "none";
  });
});

const loginForm = document.querySelector(".login-form");
loginForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const email = loginForm.username.value;
  const password = loginForm.password.value;

  auth
    .signInWithEmailAndPassword(email, password)
    .then((cred) => {
      loginForm.reset();
      loginForm.style.display = "none";
      card.style.display = "block";
      logout.style.display = "block";
    })
    .catch((err) => {
      alert("Tên đăng nhập hoặc mật khẩu không đúng");
    });
});
