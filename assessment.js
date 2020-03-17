'use strict'
const userNameInput = document.getElementById('user-name');
const assessmentButton = document.getElementById('assessment');
const resultDivided = document.getElementById('result-area');
const tweetDivided = document.getElementById('tweet-area');

/**
 * 指定した要素の子どもの要素を全て削除する
 * @param {HTMLElement} element HTMLの要素
 */
function removeALLChildren(element){
  while(element.firstChild){ //子要素がある間{}内をループする
    element.removeChild(element.firstChild);
  }
}

userNameInput.onkeydown = () =>{
  if(event.key === 'Enter'){
    assessmentButton.onclick();
  }
}


assessmentButton.onclick = () => {
  const userName = userNameInput.value;
  if(userName.length == 0){  //名前が空の時は処理中断
    return;  //戻り値なしに処理終了
  }
  removeALLChildren(resultDivided);

  const header = document.createElement('h3');
  header.innerText = '診断結果';
  resultDivided.appendChild(header);

  const paragraph = document.createElement('p');
  const result = assessment(userName);
  paragraph.innerText = result;
  resultDivided.appendChild(paragraph);

  console.log(result);

  //TODO ツイートエリアの作成
  removeALLChildren(tweetDivided);

  const anchor = document.createElement('a');
  const herfValue = 'https://twitter.com/intent/tweet?button_hashtag=' + encodeURIComponent('あなたのいいところ') + '&ref_src=twsrc%5Etfw';

  anchor.setAttribute('href', herfValue);
  anchor.className = 'twitter-hashtag-button';
  anchor.setAttribute('data-text', result);
  anchor.setAttribute('data-show-count', 'false')
  anchor.innerText = 'Tweet #あなたのいいところ';
  tweetDivided.appendChild(anchor);

  const script = document.createElement('script');

  script.setAttribute('src', 'https://platform.twitter.com/widgets.js');
  tweetDivided.appendChild(script);



}

const answers = [,
  '{userName}のいいところは声です。{userName}の特徴的な声は皆を惹きつけ、心に残ります。',
  '{userName}のいいところはまなざしです。{userName}に見つめられた人は、気になっ,て仕方がないでしょう。',
  '{userName}のいいところは情熱です。{userName}の情熱に周りの人は感化されます。',
  '{userName}のいいところは厳しさです。{userName}の厳しさがものごとをいつも成功に導,きます。',
  '{userName}のいいところは知識です。博識な{userName}を多くの人が頼りにしています。',
  '{userName}のいいところはユニークさです。{userName}だけのその特徴が皆を楽しくさせま,す。',
  '{userName}のいいところは用心深さです。{userName}の洞察に、多くの人が助けられます。',
  '{userName}のいいところは見た目です。内側から溢れ出る{userName}の良さに皆が気を惹かれま,す。',
  '{userName}のいいところは決断力です。{userName}がする決断にいつも助けられる人がいます。',
  '{userName}のいいところは思いやりです。{userName}に気をかけてもらった多くの人が感謝しています。',
  '{userName}のいいところは感受性です。{userName}が感じたことに皆が共感し、わかりあうこ,とができます。',
  '{userName}のいいところは節度です。強引すぎない{userName}の考えに皆が感謝しています。',
  '{userName}のいいところは好奇心です。新しいことに向かっていく{userName}の心構え,が多くの人に魅力的に映ります。',
  '{userName}のいいところは気配りです。{userName}の配慮が多くの人を救っています。',
  '{userName}のいいところはその全てです。ありのままの{userName}自身がいいところなのです。',
  '{userName}のいいところは自制心です。やばいと思ったときにしっかりと衝動を抑えられる{userName}が皆から評価されています。'
];


/**
 * 名前の文字列を渡すと診断結果を返す関数
 * @param {string} userName ユーザの名前
 * @return {string} 診断結果
*/

 function assessment(userName){
   console.log(userName);
   //全文字のコード番号を取得し足す
   let sumOfCharCode = 0;
   for(let i = 0; i < userName.length; i++){
     sumOfCharCode = sumOfCharCode + userName.charCodeAt (i);
   }
   //文字コード番号の合計を回答数（answersの数）で割って添字の数値を求める
   const index = sumOfCharCode % answers.length;
   let result = answers[index];

   result = result.replace(/\{userName\}/g, userName);

   return result;
 }


/*
// テストコード
console.assert(
  assessment('太郎') === '太郎のいいところは知識です。博識な太郎を多くの人が頼りにしています。',
  '診断結果の文言の特定の部分を名前に置き換える処理が正しくありません。'
);

// テストコード2 
console.assert(
  assessment('太郎') === assessment('太郎'),
  '入力が同じ名前ならば同じ結果を出力する処理が正しくありません。'
);

*/
