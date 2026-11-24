import { Injectable, OnDestroy, inject } from '@angular/core';
import { Subscription, BehaviorSubject, Observable } from 'rxjs';

import { HttpClient } from '@angular/common/http';
import { TrialApiService } from '../trial/trial-api.service';
import { Campaign } from '../../models';
import { CampaignApiAdapters } from './campaign-api.adapter';

@Injectable({
  providedIn: 'root'
})
export class CampaignApiService implements OnDestroy {
  private http = inject(HttpClient);
  private _trialApiService = inject(TrialApiService);


  private subscriptions = new Subscription();

  private selectedCampaignSubject: BehaviorSubject<Campaign>;
  private selectedCampaign: Campaign;

  private campaignApiAdapters: CampaignApiAdapters;


  constructor() {

    this.campaignApiAdapters = new CampaignApiAdapters();

    // selected campaign is inferred from the selected trial
    this.selectedCampaignSubject = new BehaviorSubject<Campaign>(null);

    this.subscriptions.add(this._trialApiService.getSelectedTrial().subscribe(
      data => {
        if (!data) {
          return;
        }

        if (data.id) {
          // the trial object only references the associated campaign
          this.setSelectedCampaignFromUrl(data.campaign);
        }
      }
    ))
  }

  private setSelectedCampaignFromUrl(campaignUrl) {
    this.http.get(campaignUrl).subscribe(
      data => {
        this.selectedCampaign = this.campaignApiAdapters.campaignAdapter(data) 
        this.selectedCampaignSubject.next(this.selectedCampaign);
      }
    )
  }

  getSelectedCampaign(): Observable<Campaign> {
    return this.selectedCampaignSubject.asObservable();
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }
}
