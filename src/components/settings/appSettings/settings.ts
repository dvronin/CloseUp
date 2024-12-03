export interface Settings {
    useDarkTheme: boolean,
    themeColours: {
        main: string,
        text: string,
        accent: string,
        border: string
    },
}

export function ChangeTheme(darkTheme: boolean) {
    const value = darkTheme ? 'invert(1)' : 'none';
    Array.from(document.getElementsByClassName('theme')).forEach(item => {
        const html = (item as HTMLElement);
        html.style.filter = value;
    });
    Array.from(document.getElementsByTagName('canvas')).forEach(item => {
        const html = (item as HTMLElement);
        html.style.filter = value;
    });
}


export function SetColor(name:
    "--color-main" | "--color-text" |
    "--color-accent" | "--color-border", value: string) {
    document.documentElement.style.setProperty(name, value);
}