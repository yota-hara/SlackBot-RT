// 誕生月のメンバー取得とメッセージ作成
const preCelebration = () => {
  const book = SpreadsheetApp.getActiveSpreadsheet();
  const sheet = book.getSheetByName(EMPLOYEE_DATA_BASE);
  const sheetData = sheet.getDataRange().getValues();
  const header = sheetData[2];

  const currentMonth = Utilities.formatDate(new Date(), 'Asia/Tokyo', 'MM');
  // 同じ誕生月のメンバーを取得
  const sameMonthBirthdays = sheetData.filter(data => {
    const birthDate = data[header.indexOf('生年月日')];
    return (
      birthDate !== '' &&
      Utilities.formatDate(new Date(birthDate), 'Asia/Tokyo', 'MM') === currentMonth
    );
  }).map(data => {
        return {
      name: data[header.indexOf('性')] + data[header.indexOf('名')],
      birthDay: Utilities.formatDate(new Date(data[header.indexOf('生年月日')]), 'Asia/Tokyo', 'MM/dd'),
    }
  });
  // 誕生日で昇順にソート
  sameMonthBirthdays.sort((a, b) => {
    const dateA = new Date(a.birthDay);
    const dateB = new Date(b.birthDay);
    return dateA - dateB;
  });

  console.log('今月が誕生月のメンバー:', sameMonthBirthdays);
  // 誕生祝いメッセージの生成
  if (sameMonthBirthdays.length === 0) return; // 誕生月の人がいる場合だけ処理を継続させる

  const names = sameMonthBirthdays.map(member => member.name).join('さん、') + 'さん';
  const birthdayList = sameMonthBirthdays.map(member => `- ${member.name}さん  ... ${member.birthDay}`).join('\n');
  const seasonComments = {
    '01': '新しい年が始まりました！今年も素晴らしい一年になりますように。',
    '02': '寒さも一段と厳しくなる2月。温かいコーヒーでほっと一息ついてくださいね。',
    '03': '春の足音が聞こえてきた3月。新しい出会いがありますように。',
    '04': '花が咲き誇る4月。新しい始まりにワクワクしませんか？',
    '05': '五月は新緑の季節。自然に感謝し、リフレッシュしましょう。',
    '06': '梅雨の季節の6月。雨の日も晴れの日も、心は明るく。',
    '07': '夏の真っ盛りの7月。夏休み計画を立てて、楽しい時間を過ごしましょう。',
    '08': '暑さが最も厳しい8月。涼しい風に吹かれて、リフレッシュしましょう。',
    '09': '秋の気配が感じられる9月。収穫の季節を迎え、感謝の気持ちを忘れずに。',
    '10': '涼しさが身にしみる10月。紅葉狩りや秋の行楽をお楽しみください。',
    '11': '寒さが本格化する11月。温かい飲み物で心も体も温まりましょう。',
    '12': '年末の忙しい12月。一年の締めくくりに、心豊かな時間を過ごしてください。'
  };
  const seasonComment = seasonComments[currentMonth];
  
  const message = [];
  message.push(`【月初のご挨拶】`);
  message.push(`${currentMonth}月スタートしました:smile::sparkles:`);
  message.push('');
  message.push(`今月は、${names}のお誕生月です！`);
  message.push(`おめでとうございます:tada:`);
  message.push('');
  message.push(birthdayList);
  message.push('');
  message.push(`${seasonComment}`);
  message.push('');
  message.push(':rainbow:今月もよろしくお願いします:rainbow:');

  console.log(message.join('\n'));

  // notificationToSlack(message)
}

// const notificationToSlack = (message) => {
//   const postUrl = "https://hooks.slack.com/triggers/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";
//   const jsonData = { "text": message };
//   const payload = JSON.stringify(jsonData);
//   const options =
//   {
//     "method" : "post",
//     "contentType" : "application/json",
//     "payload" : payload
//   };
//   UrlFetchApp.fetch(postUrl, options);
// }
