const editFormHandler = async (event) => {
    event.preventDefault();

    const post_text = document
        .querySelector("#post-text")
        .value.trim();
    const id = window.location.toString().split("/")[
        window.location.toString().split("/").length - 1
    ];

    try {
        const result = await fetch(`/api/posts/${id}`, {
            method: "PUT",
            body: JSON.stringify({ post_text }),
            headers: {
                "Content-Type": "application/json",
            },
        });

        if (result.ok) {
            document.location.replace("/dashboard/");
        }  else {
            throw new Error(res.statusText);
        }
    } catch (err) {
        console.error(err);
        alert(err.message);
    }
};

document.addEventListener("DOMContentLoaded", () => {
    document
        .querySelector(".edit-post-form")
        .addEventListener("submit", editFormHandler);
});