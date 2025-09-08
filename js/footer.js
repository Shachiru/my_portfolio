document.addEventListener('DOMContentLoaded', function () {
    updateCopyrightYear();
});

function updateCopyrightYear() {
    const currentYearElement = document.getElementById('current-year');
    if (currentYearElement) {
        const currentYear = new Date().getFullYear();
        currentYearElement.textContent = currentYear;
    }
}