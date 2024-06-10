document.addEventListener('DOMContentLoaded', function() {
    const urlParams = new URLSearchParams(window.location.search);
    const projectName = urlParams.get('project_name');

    if (projectName) {
        document.querySelector('.project-name').textContent = projectName;
    } else {
        console.error('No project name found in URL.');
    }
});
