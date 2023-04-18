document.getElementById("register-form").addEventListener("submit", async (event) => {
  event.preventDefault();

  const username = document.getElementById("username").value;
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;



  try {
    const response = await fetch("/api/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, email, password }),
    });

    // Log the response status and headers for debugging
    console.log("Response status:", response.status);
    console.log("Response headers:", response.headers);

    // Check if the response status is not ok (e.g., not a 2xx status)
    if (!response.ok) {
      // Log the response text for debugging
      const responseText = await response.text();
      console.error("Response text:", responseText);
      throw new Error("Failed to register the user.");
    }

    const result = await response.json();
    console.log("Response data:", result);
    alert("User registered successfully!");
  } catch (error) {
    console.error("Error:", error);
    alert("There was an error registering the user.");
  }
});