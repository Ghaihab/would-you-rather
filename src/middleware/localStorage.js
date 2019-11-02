const local = (store) => (next) => (action) => {
    localStorage.setItem('store', JSON.stringify(store.getState()));
    return next(action);

}

export default local;
