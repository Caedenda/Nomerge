function selectCategory(element) {
    let categories = document.querySelectorAll('.category');

    // Reset positions
    categories.forEach(cat => {
        cat.style.transform = "translateX(0)";
    });

    // Move selected category to the center
    element.style.transform = "translateX(50px)";
}
