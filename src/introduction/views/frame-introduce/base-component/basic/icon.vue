<template>
    <div>
        <el-row style="margin-bottom: 10px;">
            <el-col :span="8" :offset="8">
                <el-input v-model="searchIcon" placeholder="输入英文关键词搜索，比如 success"></el-input>
            </el-col>
        </el-row>

        <el-tabs tab-position="left">
            <el-tab-pane label="sf-icon">
                <el-row>
                    <el-col>使用方法：&lt;i class="<code>sf-icon-</code>alarmclock"&gt;&lt;/i&gt;</el-col>
                </el-row>
                <ul class="icons-list">
                    <li
                            v-for="icon in sfIcon"
                            :key="'sfIcon' + icon"
                            v-show="searchIcon == '' || $util.string.fuzzyMatch(icon, searchIcon)">
                        <span>
                            <i :class="'sf-icon-' + icon"></i>
                            <span class="icon-name">{{ icon }}</span>
                        </span>
                    </li>
                </ul>
            </el-tab-pane>
            <el-tab-pane label="element-ui">
                <el-row>
                    <el-col>使用方法：&lt;i class="<code>el-icon-</code>ice-cream-round"&gt;&lt;/i&gt;</el-col>
                </el-row>
                <ul class="icons-list">
                    <li
                            v-for="icon in elementUIIcon"
                            :key="'elIcon' + icon"
                            v-show="searchIcon == '' || $util.string.fuzzyMatch(icon, searchIcon)">
                        <span>
                            <i :class="'el-icon-' + icon"></i>
                            <span class="icon-name">{{ icon }}</span>
                        </span>
                    </li>
                </ul>
            </el-tab-pane>
            <el-tab-pane label="iview">
                <el-row>
                    <el-col>使用方法：&lt;i class="<code>ivu-icon ivu-icon-</code>ios-add-circle-outline"&gt;&lt;/i&gt;</el-col>
                </el-row>
                <ul class="icons-list">
                    <li
                            v-for="icon in ivewUIIcon"
                            :key="'ivuIcon' + icon"
                            v-show="searchIcon == '' || $util.string.fuzzyMatch(icon, searchIcon)">
                        <span>
                            <i :class="'ivu-icon ivu-icon-' + icon"></i>
                            <span class="icon-name">{{ icon }}</span>
                        </span>
                    </li>
                </ul>
            </el-tab-pane>
        </el-tabs>
    </div>
</template>

<script>
    export default{
        data(){
            return {
                searchIcon: '',
                elementUIIcon: ['ice-cream-round','ice-cream-square','lollipop','potato-strips','milk-tea','ice-drink','ice-tea','coffee','orange','pear','apple','cherry','watermelon','grape','refrigerator','goblet-square-full','goblet-square','goblet-full','goblet','cold-drink','coffee-cup','water-cup','hot-water','ice-cream','dessert','sugar','tableware','burger','knife-fork','fork-spoon','chicken','food','dish-1','dish','moon-night','moon','cloudy-and-sunny','partly-cloudy','cloudy','sunny','sunset','sunrise-1','sunrise','heavy-rain','lightning','light-rain','wind-power','baseball','soccer','football','basketball','ship','truck','bicycle','mobile-phone','service','key','unlock','lock','watch','watch-1','timer','alarm-clock','map-location','delete-location','add-location','location-information','location-outline','location','place','discover','first-aid-kit','trophy-1','trophy','medal','medal-1','stopwatch','mic','copy-document','full-screen','switch-button','aim','crop','odometer','time','bangzhu','close-notification','microphone','turn-off-microphone','position','postcard','message','chat-line-square','chat-dot-square','chat-dot-round','chat-square','chat-line-round','chat-round','set-up','turn-off','open','connection','link','cpu','thumb','female','male','guide','news','price-tag','discount','wallet','coin','money','bank-card','box','present','sell','sold-out','shopping-bag-2','shopping-bag-1','shopping-cart-2','shopping-cart-1','shopping-cart-full','smoking','no-smoking','house','table-lamp','school','office-building','toilet-paper','notebook-2','notebook-1','files','collection','receiving','suitcase-1','suitcase','film','collection-tag','data-analysis','pie-chart','data-board','data-line','reading','magic-stick','coordinate','mouse','brush','headset','umbrella','scissors','mobile','attract','monitor','search','takeaway-box','paperclip','printer','document-add','document','document-checked','document-copy','document-delete','document-remove','tickets','folder-checked','folder-delete','folder-remove','folder-add','folder-opened','folder','edit-outline','edit','date','c-scale-to-original','view','loading','rank','sort-down','sort-up','sort','finished','refresh-left','refresh-right','refresh','video-play','video-pause','d-arrow-right','d-arrow-left','arrow-up','arrow-down','arrow-right','arrow-left','top-right','top-left','top','bottom','right','back','bottom-right','bottom-left','caret-top','caret-bottom','caret-right','caret-left','d-caret','share','menu','s-grid','s-check','s-data','s-opportunity','s-custom','s-claim','s-finance','s-comment','s-flag','s-marketing','s-shop','s-open','s-management','s-ticket','s-release','s-home','s-promotion','s-operation','s-unfold','s-fold','s-platform','s-order','s-cooperation','bell','message-solid','video-camera','video-camera-solid','camera','camera-solid','download','upload2','upload','picture-outline-round','picture-outline','picture','close','check','plus','minus','help','s-help','circle-close','circle-check','circle-plus-outline','remove-outline','zoom-out','zoom-in','error','success','circle-plus','remove','info','question','warning-outline','warning','goods','s-goods','star-off','star-on','more-outline','more','phone-outline','phone','user','user-solid','setting','s-tools','delete','delete-solid','eleme','platform-eleme'],
                ivewUIIcon: ['ios-add-circle-outline','ios-add-circle','ios-add','ios-alarm-outline','ios-alarm','ios-albums-outline','ios-albums','ios-alert-outline','ios-alert','ios-american-football-outline','ios-american-football','ios-analytics-outline','ios-analytics','ios-aperture-outline','ios-aperture','ios-apps-outline','ios-apps','ios-appstore-outline','ios-appstore','ios-archive-outline','ios-archive','ios-arrow-back','ios-arrow-down','ios-arrow-dropdown-circle','ios-arrow-dropdown','ios-arrow-dropleft-circle','ios-arrow-dropleft','ios-arrow-dropright-circle','ios-arrow-dropright','ios-arrow-dropup-circle','ios-arrow-dropup','ios-arrow-forward','ios-arrow-round-back','ios-arrow-round-down','ios-arrow-round-forward','ios-arrow-round-up','ios-arrow-up','ios-at-outline','ios-at','ios-attach','ios-backspace-outline','ios-backspace','ios-barcode-outline','ios-barcode','ios-baseball-outline','ios-baseball','ios-basket-outline','ios-basket','ios-basketball-outline','ios-basketball','ios-battery-charging','ios-battery-dead','ios-battery-full','ios-beaker-outline','ios-beaker','ios-beer-outline','ios-beer','ios-bicycle','ios-bluetooth','ios-boat-outline','ios-boat','ios-body-outline','ios-body','ios-bonfire-outline','ios-bonfire','ios-book-outline','ios-book','ios-bookmark-outline','ios-bookmark','ios-bookmarks-outline','ios-bookmarks','ios-bowtie-outline','ios-bowtie','ios-briefcase-outline','ios-briefcase','ios-browsers-outline','ios-browsers','ios-brush-outline','ios-brush','ios-bug-outline','ios-bug','ios-build-outline','ios-build','ios-bulb-outline','ios-bulb','ios-bus-outline','ios-bus','ios-cafe-outline','ios-cafe','ios-calculator-outline','ios-calculator','ios-calendar-outline','ios-calendar','ios-call-outline','ios-call','ios-camera-outline','ios-camera','ios-car-outline','ios-car','ios-card-outline','ios-card','ios-cart-outline','ios-cart','ios-cash-outline','ios-cash','ios-chatboxes-outline','ios-chatboxes','ios-chatbubbles-outline','ios-chatbubbles','ios-checkbox-outline','ios-checkbox','ios-checkmark-circle-outline','ios-checkmark-circle','ios-checkmark','ios-clipboard-outline','ios-clipboard','ios-clock-outline','ios-clock','ios-close-circle-outline','ios-close-circle','ios-close','ios-closed-captioning-outline','ios-closed-captioning','ios-cloud-circle-outline','ios-cloud-circle','ios-cloud-done-outline','ios-cloud-done','ios-cloud-download-outline','ios-cloud-download','ios-cloud-outline','ios-cloud-upload-outline','ios-cloud-upload','ios-cloud','ios-cloudy-night-outline','ios-cloudy-night','ios-cloudy-outline','ios-cloudy','ios-code-download','ios-code-working','ios-code','ios-cog-outline','ios-cog','ios-color-fill-outline','ios-color-fill','ios-color-filter-outline','ios-color-filter','ios-color-palette-outline','ios-color-palette','ios-color-wand-outline','ios-color-wand','ios-compass-outline','ios-compass','ios-construct-outline','ios-construct','ios-contact-outline','ios-contact','ios-contacts-outline','ios-contacts','ios-contract','ios-contrast','ios-copy-outline','ios-copy','ios-create-outline','ios-create','ios-crop-outline','ios-crop','ios-cube-outline','ios-cube','ios-cut-outline','ios-cut','ios-desktop-outline','ios-desktop','ios-disc-outline','ios-disc','ios-document-outline','ios-document','ios-done-all','ios-download-outline','ios-download','ios-easel-outline',
                    'ios-easel','ios-egg-outline','ios-egg','ios-exit-outline','ios-exit','ios-expand','ios-eye-off-outline','ios-eye-off','ios-eye-outline','ios-eye','ios-fastforward-outline','ios-fastforward','ios-female','ios-filing-outline','ios-filing','ios-film-outline','ios-film','ios-finger-print','ios-flag-outline','ios-flag','ios-flame-outline','ios-flame','ios-flash-outline','ios-flash','ios-flask-outline','ios-flask','ios-flower-outline','ios-flower','ios-folder-open-outline','ios-folder-open','ios-folder-outline','ios-folder','ios-football-outline','ios-football','ios-funnel-outline','ios-funnel','ios-game-controller-a-outline','ios-game-controller-a','ios-game-controller-b-outline','ios-game-controller-b','ios-git-branch','ios-git-commit','ios-git-compare','ios-git-merge','ios-git-network','ios-git-pull-request','ios-glasses-outline','ios-glasses','ios-globe-outline','ios-globe','ios-grid-outline','ios-grid','ios-hammer-outline','ios-hammer','ios-hand-outline','ios-hand','ios-happy-outline','ios-happy','ios-headset-outline','ios-headset','ios-heart-outline','ios-heart','ios-help-buoy-outline','ios-help-buoy','ios-help-circle-outline','ios-help-circle','ios-help','ios-home-outline','ios-home','ios-ice-cream-outline','ios-ice-cream','ios-image-outline','ios-image','ios-images-outline','ios-images','ios-infinite-outline','ios-infinite','ios-information-circle-outline','ios-information-circle','ios-information','ios-ionic-outline','ios-ionic','ios-ionitron-outline','ios-ionitron','ios-jet-outline','ios-jet','ios-key-outline','ios-key','ios-keypad-outline','ios-keypad','ios-laptop','ios-leaf-outline','ios-leaf','ios-link-outline','ios-link','ios-list-box-outline','ios-list-box','ios-list','ios-locate-outline','ios-locate','ios-lock-outline','ios-lock','ios-log-in','ios-log-out','ios-magnet-outline','ios-magnet','ios-mail-open-outline','ios-mail-open','ios-mail-outline','ios-mail','ios-male','ios-man-outline','ios-man','ios-map-outline','ios-map','ios-medal-outline','ios-medal','ios-medical-outline','ios-medical','ios-medkit-outline','ios-medkit','ios-megaphone-outline','ios-megaphone','ios-menu-outline','ios-menu','ios-mic-off-outline','ios-mic-off','ios-mic-outline','ios-mic','ios-microphone-outline','ios-microphone','ios-moon-outline','ios-moon','ios-more-outline','ios-more','ios-move','ios-musical-note-outline','ios-musical-note','ios-musical-notes-outline','ios-musical-notes','ios-navigate-outline','ios-navigate','ios-no-smoking-outline','ios-no-smoking','ios-notifications-off-outline','ios-notifications-off','ios-notifications-outline','ios-notifications','ios-nuclear-outline','ios-nuclear','ios-nutrition-outline','ios-nutrition','ios-open-outline','ios-open','ios-options-outline','ios-options','ios-outlet-outline','ios-outlet','ios-paper-outline','ios-paper-plane-outline','ios-paper-plane','ios-paper','ios-partly-sunny-outline','ios-partly-sunny','ios-pause-outline','ios-pause','ios-paw-outline','ios-paw','ios-people-outline','ios-people','ios-person-add-outline','ios-person-add','ios-person-outline','ios-person','ios-phone-landscape','ios-phone-portrait','ios-photos-outline','ios-photos','ios-pie-outline','ios-pie','ios-pin-outline','ios-pin','ios-pint-outline','ios-pint','ios-pizza-outline','ios-pizza','ios-plane-outline','ios-plane','ios-planet-outline','ios-planet',
                    'ios-play-outline','ios-play','ios-podium-outline','ios-podium','ios-power-outline','ios-power','ios-pricetag-outline','ios-pricetag','ios-pricetags-outline','ios-pricetags','ios-print-outline','ios-print','ios-pulse-outline','ios-pulse','ios-qr-scanner','ios-quote-outline','ios-quote','ios-radio-button-off','ios-radio-button-on','ios-radio-outline','ios-radio','ios-rainy-outline','ios-rainy','ios-recording-outline','ios-recording','ios-redo-outline','ios-redo','ios-refresh-circle-outline','ios-refresh-circle','ios-refresh','ios-remove-circle-outline','ios-remove-circle','ios-remove','ios-reorder','ios-repeat','ios-resize','ios-restaurant-outline','ios-restaurant','ios-return-left','ios-return-right','ios-reverse-camera-outline','ios-reverse-camera','ios-rewind-outline','ios-rewind','ios-ribbon-outline','ios-ribbon','ios-rose-outline','ios-rose','ios-sad-outline','ios-sad','ios-school-outline','ios-school','ios-search-outline','ios-search','ios-send-outline','ios-send','ios-settings-outline','ios-settings','ios-share-alt-outline','ios-share-alt','ios-share-outline','ios-share','ios-shirt-outline','ios-shirt','ios-shuffle','ios-skip-backward-outline','ios-skip-backward','ios-skip-forward-outline','ios-skip-forward','ios-snow-outline','ios-snow','ios-speedometer-outline','ios-speedometer','ios-square-outline','ios-square','ios-star-half','ios-star-outline','ios-star','ios-stats-outline','ios-stats','ios-stopwatch-outline','ios-stopwatch','ios-subway-outline','ios-subway','ios-sunny-outline','ios-sunny','ios-swap','ios-switch-outline','ios-switch','ios-sync','ios-tablet-landscape','ios-tablet-portrait','ios-tennisball-outline','ios-tennisball','ios-text-outline','ios-text','ios-thermometer-outline','ios-thermometer','ios-thumbs-down-outline','ios-thumbs-down','ios-thumbs-up-outline','ios-thumbs-up','ios-thunderstorm-outline','ios-thunderstorm','ios-time-outline','ios-time','ios-timer-outline','ios-timer','ios-train-outline','ios-train','ios-transgender','ios-trash-outline','ios-trash','ios-trending-down','ios-trending-up','ios-trophy-outline','ios-trophy','ios-umbrella-outline','ios-umbrella','ios-undo-outline','ios-undo','ios-unlock-outline','ios-unlock','ios-videocam-outline','ios-videocam','ios-volume-down','ios-volume-mute','ios-volume-off','ios-volume-up','ios-walk','ios-warning-outline','ios-warning','ios-watch','ios-water-outline','ios-water','ios-wifi-outline','ios-wifi','ios-wine-outline','ios-wine','ios-woman-outline','ios-woman','logo-android','logo-angular','logo-apple','logo-bitcoin','logo-buffer','logo-chrome','logo-codepen','logo-css3','logo-designernews','logo-dribbble','logo-dropbox','logo-euro','logo-facebook','logo-foursquare','logo-freebsd-devil','logo-github','logo-google','logo-googleplus','logo-hackernews','logo-html5','logo-instagram','logo-javascript','logo-linkedin','logo-markdown','logo-nodejs','logo-octocat','logo-pinterest','logo-playstation','logo-python','logo-reddit','logo-rss','logo-sass','logo-skype','logo-snapchat','logo-steam','logo-tumblr','logo-tux','logo-twitch','logo-twitter','logo-usd','logo-vimeo','logo-whatsapp','logo-windows','logo-wordpress','logo-xbox','logo-yahoo','logo-yen','logo-youtube','md-add-circle','md-add','md-alarm','md-albums','md-alert','md-american-football','md-analytics','md-aperture','md-apps','md-appstore',
                    'md-archive','md-arrow-back','md-arrow-down','md-arrow-dropdown-circle','md-arrow-dropdown','md-arrow-dropleft-circle','md-arrow-dropleft','md-arrow-dropright-circle','md-arrow-dropright','md-arrow-dropup-circle','md-arrow-dropup','md-arrow-forward','md-arrow-round-back','md-arrow-round-down','md-arrow-round-forward','md-arrow-round-up','md-arrow-up','md-at','md-attach','md-backspace','md-barcode','md-baseball','md-basket','md-basketball','md-battery-charging','md-battery-dead','md-battery-full','md-beaker','md-beer','md-bicycle','md-bluetooth','md-boat','md-body','md-bonfire','md-book','md-bookmark','md-bookmarks','md-bowtie','md-briefcase','md-browsers','md-brush','md-bug','md-build','md-bulb','md-bus','md-cafe','md-calculator','md-calendar','md-call','md-camera','md-car','md-card','md-cart','md-cash','md-chatboxes','md-chatbubbles','md-checkbox-outline','md-checkbox','md-checkmark-circle-outline','md-checkmark-circle','md-checkmark','md-clipboard','md-clock','md-close-circle','md-close','md-closed-captioning','md-cloud-circle','md-cloud-done','md-cloud-download','md-cloud-outline','md-cloud-upload','md-cloud','md-cloudy-night','md-cloudy','md-code-download','md-code-working','md-code','md-cog','md-color-fill','md-color-filter','md-color-palette','md-color-wand','md-compass','md-construct','md-contact','md-contacts','md-contract','md-contrast','md-copy','md-create','md-crop','md-cube','md-cut','md-desktop','md-disc','md-document','md-done-all','md-download','md-easel','md-egg','md-exit','md-expand','md-eye-off','md-eye','md-fastforward','md-female','md-filing','md-film','md-finger-print','md-flag','md-flame','md-flash','md-flask','md-flower','md-folder-open','md-folder','md-football','md-funnel','md-game-controller-a','md-game-controller-b','md-git-branch','md-git-commit','md-git-compare','md-git-merge','md-git-network','md-git-pull-request','md-glasses','md-globe','md-grid','md-hammer','md-hand','md-happy','md-headset','md-heart-outline','md-heart','md-help-buoy','md-help-circle','md-help','md-home','md-ice-cream','md-image','md-images','md-infinite','md-information-circle','md-information','md-ionic','md-ionitron','md-jet','md-key','md-keypad','md-laptop','md-leaf','md-link','md-list-box','md-list','md-locate','md-lock','md-log-in','md-log-out','md-magnet','md-mail-open','md-mail','md-male','md-man','md-map','md-medal','md-medical','md-medkit','md-megaphone','md-menu','md-mic-off','md-mic','md-microphone','md-moon','md-more','md-move','md-musical-note','md-musical-notes','md-navigate','md-no-smoking','md-notifications-off','md-notifications-outline','md-notifications','md-nuclear','md-nutrition','md-open','md-options','md-outlet','md-paper-plane','md-paper','md-partly-sunny','md-pause','md-paw','md-people','md-person-add','md-person','md-phone-landscape','md-phone-portrait','md-photos','md-pie','md-pin','md-pint','md-pizza','md-plane','md-planet','md-play','md-podium','md-power','md-pricetag','md-pricetags','md-print','md-pulse','md-qr-scanner','md-quote','md-radio-button-off','md-radio-button-on','md-radio','md-rainy','md-recording','md-redo','md-refresh-circle','md-refresh','md-remove-circle','md-remove','md-reorder','md-repeat','md-resize','md-restaurant','md-return-left','md-return-right','md-reverse-camera','md-rewind','md-ribbon','md-rose','md-sad','md-school',
                    'md-search','md-send','md-settings','md-share-alt','md-share','md-shirt','md-shuffle','md-skip-backward','md-skip-forward','md-snow','md-speedometer','md-square-outline','md-square','md-star-half','md-star-outline','md-star','md-stats','md-stopwatch','md-subway','md-sunny','md-swap','md-switch','md-sync','md-tablet-landscape','md-tablet-portrait','md-tennisball','md-text','md-thermometer','md-thumbs-down','md-thumbs-up','md-thunderstorm','md-time','md-timer','md-train','md-transgender','md-trash','md-trending-down','md-trending-up','md-trophy','md-umbrella','md-undo','md-unlock','md-videocam','md-volume-down','md-volume-mute','md-volume-off','md-volume-up','md-walk','md-warning','md-watch','md-water','md-wifi','md-wine','md-woman','ios-loading'],
                sfIcon: ['alarmclock','open','smiley','grieved','mute','medal','cross','moonandstar','spaceinvaders','skeletor','bomb','patch','pil','injection','aids','user-md','stethoscope','cutlery','building-o','hospital-o','ambulance','medkit','chat','money','lots-money','safe','cone','blocked','stop','printer','checked-block','error-block','add-block','minus-block','heart-plus','heart-minus','clipboard','clipboard-check','clipboard-solid','plus','question','minus','heart','user','check','close','remove','times','power-off','trash-o','home','refresh','qrcode','barcode','tag','tags','print','list','image','photo','picture-o','pencil','gift','calendar','chevron-up','chevron-down','bar-chart','bar-chart-o','cogs','gears','comments','thumbs-o-up','thumbs-o-down','heart-o','external-link','sign-in','globe','arrows-alt','flask','copy','files-o','floppy-o','save','truck','comment-o','comments-o','sitemap','angle-double-left','angle-double-right','angle-double-up','angle-double-down','angle-left','angle-right','angle-up','angle-down','laptop','tablet','mobile','mobile-phone','quote-left','quote-right','folder-o','folder-open-o','smile-o','frown-o','meh-o','eur','euro','gbp','dollar','usd','inr','rupee','cny','jpy','rmb','yen','rouble','rub','ruble','krw','won','bitcoin','btc','thumbs-up','thumbs-down','female','male','wheelchair','language','building','cube','cubes','recycle','twitch','trash','area-chart','pie-chart','line-chart','street-view','heartbeat','venus','mars','user-plus','user-times','bed','map-signs','address-book','address-book-o','vcard','vcard-o','user-circle','user-circle-o','id-card','id-card-o','thermometer-full','thermometer-three-quarters','thermometer-half','thermometer-quarter','thermometer-empty','bath','office','library','credit-card','phone','phone-hang-up','trophy','gift-o','happy','happy-solid','smile','smile-solid','tongue','tongue-solid','sad','sad-solid','wink','wink-solid','grin','grin-solid','cool','cool-solid','angry','angry-solid','evil','evil-solid','shocked','shocked-solid','baffled','baffled-solid','confused','confused-solid','neutral','neutral-solid','hipster','hipster-solid','wondering','wondering-solid','sleepy','sleepy-solid','frustrated','frustrated-solid','crying','crying-solid','enter','exit']
            }
        }
    }
</script>

<style scoped="">
    code{
        color: #E65D6E;
        border: 1px solid #E65D6E;
        padding: 0 3px;
        border-radius: 6px;
        margin: 0 3px;
    }
    
    .icons-list {
        overflow: hidden;
        list-style: none;
        padding: 0 !important;
        border: 1px solid #eaeefb;
        border-radius: 4px;
    }

    .icons-list li {
        float: left;
        width: 12.5%;
        text-align: center;
        height: 120px;
        line-height: 120px;
        color: #666;
        font-size: 13px;
        border-right: 1px solid #eee;
        border-bottom: 1px solid #eee;
    }

    .icons-list li span {
        line-height: normal;
        font-family: Helvetica Neue, Helvetica, PingFang SC, Hiragino Sans GB, Microsoft YaHei, SimSun, sans-serif;
        color: #99a9bf;
        transition: color .15s linear;
    }

    .icons-list li i {
        display: block;
        font-size: 32px;
        margin-bottom: 15px;
        color: #606266;
        transition: color .15s linear;
    }

    .icons-list li .icon-name {
        display: inline-block;
        padding: 0 3px;
        height: 1em;
    }

    .icons-list li:after, .icons-list li span {
        display: inline-block;
        vertical-align: middle;
    }

    .icons-list li:after {
        content: "";
        height: 100%;
    }
</style>