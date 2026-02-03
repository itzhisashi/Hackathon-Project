function register() {
  const patient = {
    name: document.getElementById("name").value,
    age: Number(document.getElementById("age").value),
    emergency: document.getElementById("emergency").checked
  };

  fetch("/register", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(patient)
  })
  .then(res => res.json())
  .then(data => {
    document.getElementById("result").innerText =
      "Your Token Number: " + data.token;
  });
}
