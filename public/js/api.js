// JS API Calls here!

'use strict';

// trying to follow along CRUD: Create, read, update, delete
const api = (function () {
  const post = (path, obj) => {
    return $.ajax({
      type: 'POST',
      url: path,
      contentType: 'application/json',
      dataType: 'json',
      processData: false,
      data: JSON.stringify(obj),
      headers: { 'Authorization': `Bearer ${store.authToken}` }
    });
  };

  const read = (path) => {
    return $.ajax({
      type: 'GET',
      url: path,
      dataType: 'json',
      headers: { 'Authorization': `Bearer ${store.authToken}` }
    });
  };

  const put = (path, obj) => {
    return $.ajax({
      type: 'PUT',
      url: path,
      contentType: 'application/json',
      dataType: 'json',
      data: JSON.stringify(obj),
      headers: { 'Authorization': `Bearer ${store.authToken}` }
    });
  };

  const remove = (path) => {
    return $.ajax({
      type: 'DELETE',
      url: path,
      dataType: 'json',
      headers: { 'Authorization': `Bearer ${store.authToken}` }
    });
  };

  return {
    post,
    read,
    remove,
    put
  };
}());
