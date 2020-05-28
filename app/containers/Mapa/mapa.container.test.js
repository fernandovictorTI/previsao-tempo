import React from 'react';
import renderer from 'react-test-renderer';

import App from './mapa.container';

describe('<App />', () => {
    it('Renderizado corretamente', () => {
        const tree = renderer.create(<App />).toJSON();
        expect(tree).toMatchSnapshot();
    });
});