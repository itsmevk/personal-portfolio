document.querySelector('.icon').addEventListener('click', function() {
document.querySelector('#navbar').classList.toggle('collapsed');
});
 

function highlightNavItem(navItemId) {
  var navItems = document.querySelectorAll('#navbar a');
  navItems.forEach(function(navItem) {
    if (navItem.getAttribute('href') === '#' + navItemId) {
      navItem.classList.add('active');
    } else {
      navItem.classList.remove('active');
    }
  });
}


function changeContent(page) {
  var contentDiv = document.getElementById('content');

  // Add CSS class to apply slide-out and fade-out animations
  contentDiv.classList.add('slide-out');

  // Delay updating the content to allow the slide-out animation
  setTimeout(function() {
    // Create an XMLHttpRequest object
    var xhttp = new XMLHttpRequest();

    // Define the callback function
    xhttp.onreadystatechange = function() {
      if (this.readyState === 4 && this.status === 200) {
        // Create a temporary container to hold the loaded page content
        var tempContainer = document.createElement('div');
        tempContainer.innerHTML = this.responseText;

        // Extract the content from the temporary container
        var newContent = tempContainer.querySelector('#content').innerHTML;

        // Update the content div with the new content
        contentDiv.innerHTML = newContent;

        // Add CSS class to apply slide-in and fade-in animations
        contentDiv.classList.add('slide-in');

        // Trigger reflow to ensure the transition effects are applied
        contentDiv.offsetHeight;

        // Remove CSS classes to reset the animations
        contentDiv.classList.remove('slide-out');
        contentDiv.classList.remove('slide-in');

        // Scroll to the top of the page
        window.scrollTo(0, 0);

        // Collapse the navbar (if necessary)
        var navbar = document.getElementById('navbar');
        if (navbar.classList.contains('collapsed')) {
          navbar.classList.remove('collapsed');
        }
      }
    };

    // Send the request to load the desired page
    xhttp.open('GET', page + '.html', true);
    xhttp.send();
  }, 300); // Adjust the delay duration (in milliseconds) to match the transition duration
}




// Set home page as default
changeContent('home');
highlightNavItem('home');














