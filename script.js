document.getElementById('calcBtn').addEventListener('click', () => {
  const shuttleCount   = +document.getElementById('shuttleCount').value;
  const shuttlePrice   = +document.getElementById('shuttlePrice').value;
  const courtCount     = +document.getElementById('courtCount').value;
  const courtPrice     = +document.getElementById('courtPrice').value;
  const empCount       = +document.getElementById('empCount').value;
  const nonEmpCount    = +document.getElementById('nonEmpCount').value;
  const subsidyTotal   = +document.getElementById('subsidyTotal').value;

  // 1. รายจ่ายทั้งหมด
  const totalExpense = shuttleCount * shuttlePrice + courtCount * courtPrice;

  // 2. ราคาต่อหัว (รวมทุกคน)
  const totalPeople = empCount + nonEmpCount;
  const perHead = totalPeople > 0 ? totalExpense / totalPeople : 0;

  // 3. เงินสนับสนุนที่ใช้ (ไม่เกินที่มี)
  const supportUsedRaw = perHead * empCount;
  const supportUsed = Math.min(supportUsedRaw, subsidyTotal);

  // 4. เงินสนับสนุนคงเหลือ
  const subsidyRemain = subsidyTotal - supportUsed;

  // 5. ราคาต่อหัวสำหรับพนักงานหลังลด
  const perHeadEmp = empCount > 0
    ? (perHead * empCount - supportUsed) / empCount
    : 0;

  // อัปเดตผล (สองทศนิยม)
  document.getElementById('totalExpense').textContent   = totalExpense.toFixed(2);
  document.getElementById('perHeadGeneral').textContent = perHead.toFixed(2);
  document.getElementById('perHeadEmp').textContent     = perHeadEmp.toFixed(2);
  document.getElementById('subsidyRemain').textContent  = subsidyRemain.toFixed(2);
});