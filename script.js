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

let activeIndex = 0; // Initialize with the first project

function showProject(projectClass) {
  const projects = document.querySelectorAll('.project');
  const indicators = document.querySelectorAll('.section-indicator');

  // Find the index of the selected project
  const newIndex = Array.from(indicators).findIndex(indicator => indicator.dataset.project === projectClass);

  if (newIndex !== -1) {
    // Hide the previously active project
    projects[activeIndex].style.display = 'none';

    // Remove 'active' class from previously active indicator
    indicators[activeIndex].classList.remove('active');

    // Show the selected project and set the active class for the corresponding indicator
    projects[newIndex].style.display = 'block';
    indicators[newIndex].classList.add('active');

    // Update the activeIndex
    activeIndex = newIndex;
  }
}

function copyCode() {
  const codeArea = document.getElementById('codeArea');
  const codeText = codeArea.textContent;

  navigator.clipboard.writeText(codeText).then(function() {
    console.log('Code copied to clipboard');
    showCopyFeedback();
  }).catch(function(err) {
    console.error('Unable to copy code:', err);
  });
}

function showCopyFeedback() {
  const copyFeedback = document.getElementById('copyFeedback');
  copyFeedback.style.display = 'inline-block';
  setTimeout(function() {
    copyFeedback.style.display = 'none';
  }, 1500); // Hide after 1.5 seconds
}

function showProject(projectId) {
  const projectDivs = document.querySelectorAll('.project');
  projectDivs.forEach((div) => {
    div.style.display = 'none';
  });

  const selectedProject = document.getElementById(projectId);
  if (selectedProject) {
    selectedProject.style.display = 'block';

    if (projectId === 'project1') {
      const highlightFrame = document.getElementById('highlight-frame');
      if (highlightFrame) {
        highlightFrame.src = 'highlight.html';

        // Adjust the height of the iframe once the content is loaded
        highlightFrame.onload = function () {
          highlightFrame.style.height = highlightFrame.contentWindow.document.body.scrollHeight + 'px';
        };
      }
    }
  }
}

// Initially hide all project divs except project1
const initialProject = 'project1';
showProject(initialProject);


// Set home page as default
changeContent('home');
highlightNavItem('home');













