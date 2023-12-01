// 誕生日のメンバー取得とメッセージ作成
const celebration = () => {
  const book = SpreadsheetApp.getActiveSpreadsheet();
  const sheet = book.getSheetByName(EMPLOYEE_DATA_BASE);
  const sheetData = sheet.getDataRange().getValues();
  const header = sheetData[2];

  const today = Utilities.formatDate(new Date(), 'Asia/Tokyo', 'MM/dd');

  // 今日が誕生日のメンバーを取得
  const birthDayMemberNames = sheetData
    .filter(data => {
      return (
        data[header.indexOf('生年月日')] !== '' &&
        Utilities.formatDate(new Date(data[header.indexOf('生年月日')]), 'Asia/Tokyo', 'MM/dd') === today
      );
    })
    .map(data => {
      return {
        name: data[header.indexOf('性')] + data[header.indexOf('名')],
        birthDay: today,
      };
    });

  console.log('今日が誕生日のメンバー:', birthDayMemberNames);

  // 誕生祝いメッセージの生成
  if (birthDayMemberNames.length === 0) return; // 誕生日の人がいる場合だけ処理を継続させる

  const names = birthDayMemberNames.map(member => member.name).join('さん、') + 'さん';

  const message = [];
  message.push(`【Happy Birthday】`);
  message.push(`今日${today}は、${names}のお誕生日です！:birthday:`);
  message.push('');
  message.push('お誕生日おめでとうございます！！益々のご活躍をお祈りします:smile::sparkles:');
  message.push('充実した一日を過ごされますように:yellow_heart:');

  console.log(message.join('\n'));
};

