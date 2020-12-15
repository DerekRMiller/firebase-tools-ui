/**
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import '../index.scss';
import './index.scss';

import { DataTableCell, DataTableRow } from '@rmwc/data-table';
import { Icon } from '@rmwc/icon';
import { Tooltip } from '@rmwc/tooltip';
import React from 'react';
import { useHistory } from 'react-router-dom';

import { CustomThemeProvider } from '../../../../themes';
import RequestPath from '../RequestPath';
import { FirestoreRulesEvaluation } from '../rules_evaluation_result_model';
import { useRequestMainInformation } from '../utils';

const RequestTableRow: React.FC<{
  request: FirestoreRulesEvaluation;
  requestId: string;
  setShowCopyNotification: (value: boolean) => void;
}> = ({ request, requestId, setShowCopyNotification }) => {
  const history = useHistory();
  const [
    requestTimeComplete,
    requestTimeFromNow,
    requestMethod,
    resourcePath,
    outcomeData,
  ] = useRequestMainInformation(request);

  return (
    <DataTableRow
      onClick={() => history.push(`/firestore/requests/${requestId}`)}
    >
      <CustomThemeProvider use={outcomeData?.theme || 'note'} wrap>
        <DataTableCell className="Firestore-Request-Outcome">
          {outcomeData?.icon && (
            <Tooltip content={outcomeData?.label} align="top" enterDelay={100}>
              <Icon icon={{ icon: outcomeData?.icon }} />
            </Tooltip>
          )}
        </DataTableCell>
      </CustomThemeProvider>
      <DataTableCell className="Firestore-Request-Method">
        {requestMethod}
      </DataTableCell>
      <DataTableCell className="Firestore-Request-Path">
        {resourcePath && (
          <RequestPath
            resourcePath={resourcePath}
            setShowCopyNotification={setShowCopyNotification}
          />
        )}
      </DataTableCell>
      <Tooltip content={requestTimeComplete} align="topLeft" enterDelay={100}>
        <DataTableCell className="Firestore-Request-Date">
          {requestTimeFromNow}
        </DataTableCell>
      </Tooltip>
    </DataTableRow>
  );
};

export default RequestTableRow;
