if (document.readyState == 'loading') {
    document.addEventListener('DOMContentLoaded', ready);
} else {
    ready();
}
  
function ready() {
    const statusForm = document.getElementById('status');

    /*add event listener to status button from tracking form*/
    statusForm.addEventListener('submit', event => {
        event.preventDefault();
        window.location.href = "./tracking_page.html";
    });
    
}

