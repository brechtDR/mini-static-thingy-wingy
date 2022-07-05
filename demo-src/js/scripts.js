import Utils from "./helpers";

const themeSwitch = () => {
    if (localStorage.theme) {
        if (localStorage.theme === 'dark') {
            document.querySelector('html').classList.add('dark');
        }
    } else if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
        document.querySelector('html').classList.add('dark');
    }

    document.getElementById('switch-theme').addEventListener('click', function() {
        let htmlClasses = document.querySelector('html').classList;
        if(localStorage.theme == 'dark') {
            htmlClasses.remove('dark');
            localStorage.theme = 'light';
        } else {
            htmlClasses.add('dark');
            localStorage.theme = 'dark';
        }
    });
}

Utils.domLoaded(() => {
    themeSwitch();
});
