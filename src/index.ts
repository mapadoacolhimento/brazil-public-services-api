async function script() {
  const sleep = (ms = 0) =>
    new Promise((resolve) => setTimeout(resolve, ms));

  let rawGrid = document.querySelectorAll('[role="grid"]')[0];
  let rowCount = Number(rawGrid.getAttribute('aria-rowcount'));
  let data = [];
  let maxRowLoop = 19;
  let rest = rowCount;
  let rowIndex = 1;

  while (rest > 0) {
    for (let i = 1; i <= maxRowLoop; i++) {
      let row = document.querySelectorAll(
        `[aria-rowindex="${rowIndex}"]`
      )[0];
      let columns = row.querySelectorAll('[role="gridcell"]') || [];
      let coordinates;
      if (columns.length > 0) {
        const gaLinkEl = [
          ...columns[columns.length - 1].childNodes,
        ].map((el) => el)[0];
        // @ts-ignore
        const gaLink = gaLinkEl.getAttribute('href');
        const [lat, lng] = gaLink.split('=')[1].split(',');
        coordinates = ';' + lat + ';' + lng;
      }
      let text = [...columns].map((el) => el.textContent);
      let textStr = text.join(';');
      let textWithLatLng = coordinates
        ? textStr + coordinates
        : textStr;
      // console.log({ row })
      data.push(textWithLatLng);

      rest = rest - 1;
      rowIndex = rowIndex + 1;
      // console.log({ rest })
      if (i === maxRowLoop) {
        row?.scrollIntoView({ behavior: 'instant' });
        await sleep(1000);
      }
    }
    console.log({ data, rest });
  }
}
