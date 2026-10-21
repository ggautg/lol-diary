import LolDiaryController from './LolDiaryController'
import DiaryEntryController from './DiaryEntryController'
import StatsController from './StatsController'
import RiotAccountController from './RiotAccountController'
import Settings from './Settings'
const Controllers = {
    LolDiaryController: Object.assign(LolDiaryController, LolDiaryController),
DiaryEntryController: Object.assign(DiaryEntryController, DiaryEntryController),
StatsController: Object.assign(StatsController, StatsController),
RiotAccountController: Object.assign(RiotAccountController, RiotAccountController),
Settings: Object.assign(Settings, Settings),
}

export default Controllers