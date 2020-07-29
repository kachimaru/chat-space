$(function(){
function appendUser (user) {
  const html = `<div class="chat-group-user clearfix">
                <p class="chat-group-user__name">${user.name}</p>
                <a class="user-search-add chat-group-user__btn chat-group-user__btn--add" data-user-id="${user.id}" data-user-name="${user.name}">追加</a>
              </div>`
  user_list.append(html);
}

function appendMessage (message) {
  const html = `<div class="chat-group-user clearfix">
                <p class="chat-group-user__name">${message}</p>
              </div>`
  user_list.append(html);
}

function addUser (name, id) {
  const html = `<div class='chat-group-user clearfix js-chat-member' id='chat-group-user-${id}'>
                <input name='group[user_ids][]' type='hidden' value='${id}'>
                <p class='chat-group-user__name'>${name}</p>
                <a class='user-search-remove chat-group-user__btn chat-group-user__btn--remove js-remove-btn'>削除</a>
              </div>`
  $('.js-add-user').append(html);
}
const user_list = $('#user-search-result');

onload = function(){
// ブラウザの読み込みが完了した段階で処理が開始
let userIds = []; 
// 空の配列を作成
$('.js-chat-member').each(function(index, element) {
  ids = $(element).attr('id');
  userIds.push(ids);
});

$('#user-search-field').on('input', function(e) {
  e.preventDefault();
  // 入力内容を取得
  const input = $('#user-search-field').val();
  if (input.length == 0) {
    user_list.empty();
    return false;
  };
  // ajaxでdata:に持たせてあげる
  // コントローラに送ってあげる！コントロ
  $.ajax({
    type: 'GET',
    url: '/users',
    dataType: 'json',
    data: { keyword: input,
            user_ids: userIds },
  })
  .done(function(users) {
    user_list.empty();
    if (users.length !== 0) {
      users.forEach(function(user) {
        appendUser(user);
      })
    } else {
      appendMessage('一致するユーザーが見つかりません');
    }
  })
  .fail(function() {
    alert("ユーザー検索に失敗しました");
  })
});

  user_list.on('click', '.chat-group-user__btn--add', function() {
  const userName = $(this).attr('data-user-name');
  const userId   = $(this).attr('data-user-id');

  userIds.push(userId);
  // 追加したuserのidを配列userIdsに追加してあげる。
  $(this).parent().remove();
  addUser(userName, userId);
})

$('.js-add-user').on('click', '.js-remove-btn', function() {
  const removeId = $(this).prev().prev('input').val();
  // const removeId = $(this).siblings('input').val();でも良いかも
  // 削除したuserのidをfilterメソッドを使用して配列を作り直してる。今回は削除したユーザーのidを配列userIdsから弾いてます。
  // 削除したユーザーを検索結果で表示させるためです！
  userIds = userIds.filter(function(id){
    return id != removeId;
  });
  $(this).parent().remove();
})
}
})