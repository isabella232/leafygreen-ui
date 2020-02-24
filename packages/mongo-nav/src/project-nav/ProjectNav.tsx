import React from 'react';
import Tooltip from '@leafygreen-ui/tooltip';
import { Menu, MenuItem } from '@leafygreen-ui/menu';
import { createDataProp } from '@leafygreen-ui/lib';
import { css, cx } from '@leafygreen-ui/emotion';
import { uiColors } from '@leafygreen-ui/palette';
import IconButton from '@leafygreen-ui/icon-button';
import Icon from '@leafygreen-ui/icon';
import { useUsingKeyboardContext } from '@leafygreen-ui/leafygreen-provider';
import { ProjectSelect } from '../mongo-select/index';
import { facepaint, breakpoints } from '../breakpoints';
import { useViewportSize } from '@leafygreen-ui/hooks';
import {
  ProjectInterface,
  URLSInterface,
  CurrentProjectInterface,
  Product,
  HostsInterface,
} from '../types';

const productIconProp = createDataProp('charts-data-prop');
export const projectNavHeight = 45;

const navContainerStyle = css`
  display: flex;
  justify-content: space-between;
  width: 100%;
  padding-left: 15px;
  padding-right: 15px;
  height: ${projectNavHeight}px;
  box-shadow: 0 3px 7px 0 rgba(67, 117, 151, 0.08);
  overflow: hidden;
  box-sizing: border-box;
`;

const mongoSelectWrapper = css`
  display: flex;
  align-items: center;
`;

const menuIconButtonStyle = css`
  background-color: transparent;
  margin: auto;

  ${facepaint({
    marginRight: ['20px', '14px', '20px'],
  })}
`;

const menuIconStyle = css`
  transform: rotate(90deg);
`;

const productListStyle = css`
  list-style: none;
  display: flex;
  position: relative;
  padding: 0;
  margin: 0;
  margin-block-start: 0;
  margin-block-end: 0;
`;

const productStyle = css`
  display: inline-flex;
  justify-content: center;
  position: relative;

  ${facepaint({
    width: ['100px', '60px', '100px'],
    marginRight: ['16px', '8px', '16px'],
  })}

  &:last-of-type {
    margin-right: 0;
  }
`;

const makeBorderVisible = css`
  &:after {
    opacity: 1;
    transform: scale(1);
  }
`;

const activeProductColor = css`
  font-weight: bolder;
  color: ${uiColors.green.dark3};

  > ${productIconProp.selector} {
    color: ${uiColors.green.base};
  }

  ${makeBorderVisible};

  &:after {
    background-color: ${uiColors.green.base}};
  }

  &:hover {
    color: ${uiColors.green.dark3};

    > ${productIconProp.selector} {
      color: ${uiColors.green.base};
    }
  }
`;

const focusProductColor = css`
  outline: none;

  &:focus {
    color: ${uiColors.blue.base};

    > ${productIconProp.selector} {
      color: ${uiColors.blue.base};
    }

    ${makeBorderVisible};

    &:after {
      background-color: #9dd0e7;
    }
  }
`;

const productTextStyle = css`
  text-decoration: none;
  font-size: 14px;
  line-height: 16px;
  color: ${uiColors.gray.dark2};
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100px;
  transition: 150ms color ease-in-out;

  &:after {
    content: '';
    height: 3px;
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    opacity: 0;
    transform: scale(0.8, 1);
    background-color: ${uiColors.gray.light2};
    transition: 150ms all ease-in-out;
    border-radius: 50px 50px 0 0;
  }

  &:hover {
    ${makeBorderVisible};
    color: ${uiColors.gray.dark3};

    > ${productIconProp.selector} {
      color: ${uiColors.gray.dark2};
    }
  }
`;

const iconButtonMargin = css`
  ${facepaint({
    marginRight: ['16px', '16px', '20px'],
  })}
`;

const alertBadgeStyle = css`
  position: absolute;
  top: -6px;
  right: -4px;
  background-color: ${uiColors.red.base};
  width: 14px;
  height: 14px;
  border-radius: 200px;
  font-size: 8px;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const productIconStyle = css`
  margin-right: 4px;
  color: ${uiColors.gray.base};
`;

interface ProjectNavInterface {
  current: CurrentProjectInterface;
  data?: Array<ProjectInterface>;
  constructProjectURL: (orgID: string, projID: string) => string;
  urls: Required<URLSInterface>;
  hosts: Required<HostsInterface>;
  alerts?: number;
  activeProduct: Product;
  onProjectChange: React.ChangeEventHandler;
}

export default function ProjectNav({
  current,
  data,
  constructProjectURL,
  urls,
  activeProduct,
  onProjectChange,
  hosts,
  alerts = 0,
}: ProjectNavInterface) {
  const [open, setOpen] = React.useState(false);
  const { usingKeyboard: showFocus } = useUsingKeyboardContext();
  const { projectNav } = urls;
  const { width: viewportWidth } = useViewportSize();
  const isMobile = viewportWidth < breakpoints.small;

  const getProductClassName = (product: Product) =>
    cx(productTextStyle, {
      [activeProductColor]: activeProduct === product,
      [focusProductColor]: showFocus,
    });

  return (
    <nav
      className={navContainerStyle}
      aria-label="project navigation"
      data-testid="project-nav"
    >
      <div
        className={css`
          display: flex;
        `}
      >
        <div className={mongoSelectWrapper}>
          <ProjectSelect
            current={current}
            data={data}
            constructProjectURL={constructProjectURL}
            urls={urls}
            onChange={onProjectChange}
          />
        </div>

        <Menu
          open={open}
          setOpen={setOpen}
          trigger={
            <IconButton
              ariaLabel="More"
              className={menuIconButtonStyle}
              active={open}
            >
              <Icon glyph="Ellipsis" className={menuIconStyle} />
            </IconButton>
          }
        >
          <MenuItem href={projectNav.settings}>Project Settings</MenuItem>
          <MenuItem href={projectNav.accessManager}>
            Project Access Manager
          </MenuItem>
          <MenuItem href={projectNav.support}>Project Support</MenuItem>
          <MenuItem href={projectNav.integrations}>Integrations</MenuItem>
        </Menu>

        <ul className={productListStyle}>
          <li role="none" className={productStyle}>
            <a href={hosts.cloud} className={getProductClassName('cloud')}>
              {!isMobile && (
                <Icon
                  {...productIconProp.prop}
                  className={productIconStyle}
                  glyph="Cloud"
                />
              )}
              Atlas
            </a>
          </li>

          <li role="none" className={productStyle}>
            <a href={hosts.realm} className={getProductClassName('realm')}>
              {!isMobile && (
                <Icon
                  {...productIconProp.prop}
                  className={productIconStyle}
                  glyph="Stitch"
                />
              )}
              Realm
            </a>
          </li>

          <li role="none" className={productStyle}>
            <a href={hosts.charts} className={getProductClassName('charts')}>
              {!isMobile && (
                <Icon
                  {...productIconProp.prop}
                  className={productIconStyle}
                  glyph="Charts"
                />
              )}
              Charts
            </a>
          </li>
        </ul>
      </div>

      {!isMobile && (
        <div
          className={css`
            display: flex;
            align-items: center;
          `}
        >
          <Tooltip
            align="bottom"
            justify="middle"
            variant="dark"
            trigger={
              <IconButton
                ariaLabel="Invite"
                href={projectNav.invite as string}
                className={iconButtonMargin}
                size="large"
              >
                <Icon glyph="Person" size="large" />
              </IconButton>
            }
          >
            Invite To Project
          </Tooltip>

          <Tooltip
            align="bottom"
            variant="dark"
            justify="middle"
            trigger={
              <IconButton
                ariaLabel="Project Activity Feed"
                href={projectNav.activityFeed as string}
                size="large"
                className={iconButtonMargin}
              >
                <Icon glyph="Save" size="large" />
              </IconButton>
            }
          >
            View the Project Activity Feed
          </Tooltip>

          <Tooltip
            align="bottom"
            justify="middle"
            variant="dark"
            trigger={
              <IconButton
                ariaLabel="Alerts"
                href={projectNav.alerts as string}
                size="large"
              >
                {alerts > 0 && <div className={alertBadgeStyle}>{alerts}</div>}
                <Icon glyph="Bell" size="large" />
              </IconButton>
            }
          >
            View the Project Alerts
          </Tooltip>
        </div>
      )}
    </nav>
  );
}