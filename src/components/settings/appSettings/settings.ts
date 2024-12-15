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
    const rules = Array.from(document.styleSheets[0].cssRules) as Array<CSSStyleRule>;

    const index = rules.findIndex(rule => rule.selectorText == ".theme");
    if (index == -1)
        return;

    const rule = rules[index];
    rule.style.filter = value;

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