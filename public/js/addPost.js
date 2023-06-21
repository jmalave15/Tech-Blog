const newFormHandler = async (event) => {
    event.preventDefault();
    const title = document.querySelector("#post-title").value.trim();
    const post_text = document.querySelector("#post-text").value.trim();
    
    if (title && content) {
        const response = await fetch("/api/posts", {
        method: "POST",
        body: JSON.stringify({ title, post_text, }),
        headers: {
            "Content-Type": "application/json",
        },
        });
    
        if (response.ok) {
        document.location.replace("/dashboard");
        } else {
        alert("Failed to add post");
        }
    }
    };

    document
    .querySelector(".new-post-form")
    .addEventListener("submit", newFormHandler);