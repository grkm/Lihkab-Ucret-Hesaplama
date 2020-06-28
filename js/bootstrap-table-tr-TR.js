/**
 * Bootstrap Table Turkish translation
 * Author: Gorkem Tabak ~ gorkemtabak@gmail.com
 */

$.fn.bootstrapTable.locales['tr-TR'] = {
    formatLoadingMessage () {
      return 'Yükleniyor, lütfen bekleyin'
    },
    formatRecordsPerPage (pageNumber) {
      return `Sayfa başına ${pageNumber} kayıt.`
    },
    formatShowingRows (pageFrom, pageTo, totalRows, totalNotFiltered) {
      if (totalNotFiltered !== undefined && totalNotFiltered > 0 && totalNotFiltered > totalRows) {
        return `${totalRows} kayıttan ${pageFrom}-${pageTo} arası gösteriliyor (filtrelenen ${totalNotFiltered} toplam satır).`
      }
  
      return `${totalRows} kayıttan ${pageFrom}-${pageTo} arası gösteriliyor.`
    },
    formatSRPaginationPreText () {
      return 'Önceki Sayfa'
    },
    formatSRPaginationPageText (page) {
      return `Sayfaya Git ${page}`
    },
    formatSRPaginationNextText () {
      return 'Sonraki Sayfa'
    },
    formatDetailPagination (totalRows) {
      return ` ${totalRows} Satır gösteriliyor`
    },
    formatClearSearch () {
      return 'Aramayı Temizle'
    },
    formatSearch () {
      return 'Ara'
    },
    formatNoMatches () {
      return 'Eşleşen kayıt bulunamadı.'
    },
    formatPaginationSwitch () {
      return 'Sayfa numaralarını Gizle/Göster'
    },
    formatPaginationSwitchDown () {
      return 'Sayfa numaralarını göster'
    },
    formatPaginationSwitchUp () {
      return 'Sayfa numaralarını gizle'
    },
    formatRefresh () {
      return 'Yenile'
    },
    formatToggle () {
      return 'Değiştir'
    },
    formatToggleOn () {
      return 'Kart Görünümünü Göster'
    },
    formatToggleOff () {
      return 'Kart Görünümünü Kapat'
    },
    formatColumns () {
      return 'Sütunlar'
    },
    formatColumnsToggleAll () {
      return 'Hepsini Kapat'
    },
    formatFullscreen () {
      return 'Tam Ekran'
    },
    formatAllRows () {
      return 'Tüm Satırlar'
    },
    formatAutoRefresh () {
      return 'Otomatik Yenile'
    },
    formatExport () {
      return 'data Kaydet'
    },
    formatJumpTo () {
      return 'Git'
    },
    formatAdvancedSearch () {
      return 'Detaylı Ara'
    },
    formatAdvancedCloseButton () {
      return 'Kapat'
    }
  }
  
  $.extend($.fn.bootstrapTable.defaults, $.fn.bootstrapTable.locales['tr-TR'])
  