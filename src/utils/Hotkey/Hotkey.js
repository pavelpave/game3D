import React from 'react';

// Компонент для регистрации хоткеев и выполнения неких функций,
// которые можно пробрасывать пропсами - удобно на этапе отладки.
// example:
// <Hotkey hotkey={{
//     key: 'x',
//     altKey: false,
//     shiftKey: false,
//     ctrlKey: true,
// }} func={() => {console.log('hello world');}} />
class Hotkey extends React.Component {

    handler = null;

    componentDidMount() {
        const {hotkey, func} = this.props;

        this.handler = window.addEventListener('keyup', (event) => {
            let pressed = true;
            for (const key in hotkey) {
                if (hotkey.hasOwnProperty(key)) {
                    if (event[key] !== hotkey[key]) {
                        pressed = false;
                    }
                }
            }
            if (pressed) {
                func();
            }
        });
    }

    componentWillUnmount() {
        window.removeEventListener('keyup', this.handler);
    }

    render() {
        return (
            <></>
        )
    }
}

export default Hotkey;