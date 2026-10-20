import LolDiaryController from './LolDiaryController'
import DiaryEntryController from './DiaryEntryController'
import Settings from './Settings'
const Controllers = {
    LolDiaryController: Object.assign(LolDiaryController, LolDiaryController),
DiaryEntryController: Object.assign(DiaryEntryController, DiaryEntryController),
Settings: Object.assign(Settings, Settings),
}

export default Controllers