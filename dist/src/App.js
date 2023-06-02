var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
import React, { useState, useLayoutEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import Header from './components/Header';
import GradientGenerator from './components/GradientGenerator';
import MessageContainer from './components/MessageContainer';
import { ThemeMode, themeModeLocalStorageKey } from './shared/constants';
var App = function () {
    var _a = useState([]), messages = _a[0], setMessages = _a[1];
    var _b = useState(null), activeThemeMode = _b[0], setActiveThemeMode = _b[1];
    var addNewMessage = function (newMessage) {
        var newMessageArray = __spreadArray(__spreadArray([], messages, true), [
            __assign({ id: uuidv4() }, newMessage),
        ], false);
        setMessages(newMessageArray);
    };
    var handleRemoveMessage = function (messageId) {
        setMessages(function (prevState) {
            return prevState.filter(function (message) { return message.id !== messageId; });
        });
    };
    var setThemeMode = function (modeName) {
        document.documentElement.setAttribute('data-theme', modeName);
        localStorage.setItem(themeModeLocalStorageKey, modeName);
        setActiveThemeMode(modeName);
    };
    var toggleThemeMode = function () {
        return setThemeMode(document.documentElement.getAttribute('data-theme') === ThemeMode.LIGHT
            ? ThemeMode.DARK
            : ThemeMode.LIGHT);
    };
    useLayoutEffect(function () {
        var themeFromLocalStorage = localStorage.getItem(themeModeLocalStorageKey);
        var themeFromSystemPreference = window.matchMedia('(prefers-color-scheme: dark)').matches
            ? ThemeMode.DARK
            : ThemeMode.LIGHT;
        if (themeFromLocalStorage) {
            setThemeMode(themeFromLocalStorage);
        }
        else {
            setThemeMode(themeFromSystemPreference);
        }
    }, []);
    return (React.createElement("main", null,
        React.createElement(Header, { activeThemeMode: activeThemeMode, toggleThemeMode: toggleThemeMode }),
        React.createElement(GradientGenerator, { addNewMessage: addNewMessage }),
        React.createElement(MessageContainer, { messages: messages, handleRemoveMessage: handleRemoveMessage })));
};
export default App;
//# sourceMappingURL=App.js.map