import { configureStore, PreloadedState } from '@reduxjs/toolkit';
import { render, RenderOptions } from '@testing-library/react';
import React from 'react';
import { PropsWithChildren } from 'react';
import { Provider } from 'react-redux';
import type { AppStore, RootState } from '../stores';
import { reducers } from '../stores/reducers';
import authReducer, { authInitialState } from '../stores/reducers/auth';

declare const jest: any;
interface ExtendedRenderOptions extends Omit<RenderOptions, 'queries'> {
    preloadedState?: PreloadedState<RootState>;
    store?: AppStore
}

export function renderWithProviders(
    ui: React.ReactElement,
    {
        preloadedState = { authReducer: authInitialState },
        store = configureStore({ reducer: reducers, preloadedState }),
        ...renderOptions
    }: ExtendedRenderOptions = {}
) {
    function Wrapper({ children }: PropsWithChildren<{}>): JSX.Element {
        return <Provider store={store}>{children}</Provider>
    }

    return { store, ...render(ui, { wrapper: Wrapper, ...renderOptions }) }
}

export function reactI18nextMock() {
    jest.mock('react-i18next', () => ({
        useTranslation: () => {
            return {
                t: (str: string): string => str,
            };
        },
    }));
      
}