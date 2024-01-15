import $ from "jquery";
import tinymce from "tinymce";
import toast from "react-hot-toast";
import {additionMinorForm} from "./generalFunctions";

export let staticData = [
  {
    "type": "emailInput",
    "required": true,
    "label": "Email",
    "name": "emailInput-1701924765044-0"
  },
  {
    "type": "richTextEditor",
    "required": false,
    "label": "Rich Text Editor",
    "name": "richTextEditor-1701924768697-0",
    "userData": "<div id='source'>\n<div style=\"text-align: center;\"><img src=\"https://owp-prod-comm.s3.amazonaws.com/images/ccfd8364-eb62-41ca-b6e1-de2aaea45138.png\" width=\"93\" height=\"109\"></div>\n<h3>&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;<strong>Florida Fish and Wildlife Conservation Commission</strong></h3>\n<p style=\"text-align: center;\"><strong>Livery Pre-Rental and Pre-Ride Instruction</strong></p>\n<p style=\"text-align: center;\"><strong>Checklist and Attestation</strong></p>\n<p style=\"text-align: left;\">&nbsp;</p>\n<form name=\"fwc-form\">\n<table style=\"border-collapse: collapse; width: 100.077%; height: 1116.84px; border-spacing: 5px; border: 1px solid #000000;\" border=\"1\"><colgroup><col style=\"width: 8.41291%;\"><col style=\"width: 8.73038%;\"><col style=\"width: 83.0179%;\"></colgroup>\n<tbody>\n<tr style=\"height: 19.5938px;\">\n<td style=\"text-align: center; height: 19.5938px; border-width: 1px; border-color: rgb(0, 0, 0); padding: 5px;\">Renter</td>\n<td style=\"text-align: center; height: 19.5938px; border-width: 1px; border-color: rgb(0, 0, 0); padding: 5px;\">Instructor</td>\n<td style=\"height: 19.5938px; border-width: 1px; border-color: rgb(0, 0, 0); padding: 5px;\"><strong>&nbsp;</strong></td>\n</tr>\n<tr style=\"height: 78.375px;\">\n<td class=\"sign\" style=\"text-align: center; height: 78.375px; border-width: 1px; border-color: rgb(0, 0, 0); padding: 5px;\">[owp_initial]</td>\n<td style=\"text-align: center; height: 78.375px; border-width: 1px; border-color: rgb(0, 0, 0); padding: 5px;\"><input style=\"transform: scale(1.25); text-align: center;\" checked=\"checked\" name=\"agree-instructor-line-1\" type=\"checkbox\" value=\"agreed\"></td>\n<td style=\"height: 78.375px; border-width: 1px; border-color: rgb(0, 0, 0); padding: 5px;\"><strong>Operator Responsibility:</strong><br>Operator is responsible for the safe and proper operation of the vessel; Avoid careless, reckless and&nbsp;negligent operation of vessels; Effects of alcohol, controlled substances and stressors</td>\n</tr>\n<tr style=\"height: 97.9688px;\">\n<td class=\"sign\" style=\"text-align: center; height: 97.9688px; border-width: 1px; border-color: rgb(0, 0, 0); padding-top: 5px; padding-right: 5px; padding-bottom: 5px;\">[owp_initial]</td>\n<td style=\"text-align: center; height: 97.9688px; border-width: 1px; border-color: rgb(0, 0, 0); padding: 5px;\"><input style=\"transform: scale(1.25); text-align: center;\" checked=\"checked\" name=\"agree-instructor-line-2\" type=\"checkbox\" value=\"agreed\"></td>\n<td style=\"height: 97.9688px; border-width: 1px; border-color: rgb(0, 0, 0); padding: 5px;\"><strong>Navigation Rules:</strong> <br>Maintain a proper lookout; Keep a safe distance from other vessels and objects; Operate at a safe speed&nbsp;for the conditions; location and environment; Operate in a defensive manner; Requirements to give way&nbsp;to other vessels and vessel right of way</td>\n</tr>\n<tr style=\"height: 19.5938px;\">\n<td class=\"sign\" style=\"text-align: center; height: 97.9688px; border-width: 1px; border-color: rgb(0, 0, 0); padding: 5px;\">[owp_initial]</td>\n<td style=\"text-align: center; height: 97.9688px; border-width: 1px; border-color: rgb(0, 0, 0); padding: 5px;\"><input style=\"transform: scale(1.25); text-align: center;\" checked=\"checked\" name=\"agree-instructor-line-7\" type=\"checkbox\" value=\"agreed\"></td>\n<td style=\"height: 19.5938px; border-width: 1px; border-color: rgb(0, 0, 0); padding: 5px;\"><strong>Aids to navigation; buoys and other waterways markers</strong></td>\n</tr>\n<tr style=\"height: 78.375px;\">\n<td class=\"sign\" style=\"text-align: center; height: 97.9688px; border-width: 1px; border-color: rgb(0, 0, 0); padding: 5px;\">[owp_initial]</td>\n<td style=\"text-align: center; height: 97.9688px; border-width: 1px; border-color: rgb(0, 0, 0); padding: 5px;\"><input style=\"transform: scale(1.25); text-align: center;\" checked=\"checked\" name=\"agree-instructor-line-3\" type=\"checkbox\" value=\"agreed\"></td>\n<td style=\"height: 78.375px; border-width: 1px; border-color: rgb(0, 0, 0); padding: 5px;\"><strong>Special Waterway Hazards:<br></strong>Operate at slow speed minimum wake when within 300 feet or emergency vessels with activated&nbsp;emergency lights or within 300 feet of construction vessels displaying an orange flag</td>\n</tr>\n<tr style=\"height: 39.1875px;\">\n<td class=\"sign\" style=\"text-align: center; height: 97.9688px; border-width: 1px; border-color: rgb(0, 0, 0); padding: 5px;\">[owp_initial]</td>\n<td style=\"text-align: center; height: 97.9688px; border-width: 1px; border-color: rgb(0, 0, 0); padding: 5px;\"><input style=\"transform: scale(1.25); text-align: center;\" checked=\"checked\" name=\"agree-instructor-line-4\" type=\"checkbox\" value=\"agreed\"></td>\n<td style=\"height: 39.1875px; border-width: 1px; border-color: rgb(0, 0, 0); padding: 5px;\"><strong>Awareness of changes to weather or water conditions and proper responses to </strong><strong>those changes</strong></td>\n</tr>\n<tr style=\"height: 39.1875px;\">\n<td class=\"sign\" style=\"text-align: center; height: 97.9688px; border-width: 1px; border-color: rgb(0, 0, 0); padding: 5px;\">[owp_initial]</td>\n<td style=\"text-align: center; height: 97.9688px; border-width: 1px; border-color: rgb(0, 0, 0); padding: 5px;\"><input style=\"transform: scale(1.25); text-align: center;\" checked=\"checked\" name=\"agree-instructor-line-5\" type=\"checkbox\" value=\"agreed\"></td>\n<td style=\"height: 39.1875px; border-width: 1px; border-color: rgb(0, 0, 0); padding: 5px;\"><strong>Requirements for operating a vessel while a person is waterskiing or participating </strong><strong>in similar activities identified in s. 327.37, F.S., if applicable.</strong></td>\n</tr>\n<tr style=\"height: 39.1875px;\">\n<td class=\"sign\" style=\"text-align: center; height: 97.9688px; border-width: 1px; border-color: rgb(0, 0, 0); padding: 5px;\">[owp_initial]</td>\n<td style=\"text-align: center; height: 97.9688px; border-width: 1px; border-color: rgb(0, 0, 0); padding: 5px;\"><input style=\"transform: scale(1.25); text-align: center;\" checked=\"checked\" name=\"agree-instructor-line-6\" type=\"checkbox\" value=\"agreed\"></td>\n<td style=\"height: 39.1875px; border-width: 1px; border-color: rgb(0, 0, 0); padding: 5px;\"><strong>Propulsion, steering and stopping characteristics of vessels:</strong><br>Discuss in general and as to the specific vessel being leased or rented</td>\n</tr>\n<tr style=\"height: 19.5938px;\">\n<td class=\"sign\" style=\"text-align: center; height: 97.9688px; border-width: 1px; border-color: rgb(0, 0, 0); padding: 5px;\">[owp_initial]</td>\n<td style=\"text-align: center; height: 97.9688px; border-width: 1px; border-color: rgb(0, 0, 0); padding: 5px;\"><input style=\"transform: scale(1.25); text-align: center;\" checked=\"checked\" name=\"agree-instructor-line-7\" type=\"checkbox\" value=\"agreed\"></td>\n<td style=\"height: 19.5938px; border-width: 1px; border-color: rgb(0, 0, 0); padding: 5px;\"><strong>Location and content of manufacturer warning labels</strong></td>\n</tr>\n<tr style=\"height: 19.5938px;\">\n<td class=\"sign\" style=\"text-align: center; height: 97.9688px; border-width: 1px; border-color: rgb(0, 0, 0); padding: 5px;\">[owp_initial]</td>\n<td style=\"text-align: center; height: 97.9688px; border-width: 1px; border-color: rgb(0, 0, 0); padding: 5px;\"><input style=\"transform: scale(1.25); text-align: center;\" checked=\"checked\" name=\"agree-instructor-line-8\" type=\"checkbox\" value=\"agreed\"></td>\n<td style=\"height: 19.5938px; border-width: 1px; border-color: rgb(0, 0, 0); padding: 5px;\"><strong>Location of and proper use of safety equipment</strong></td>\n</tr>\n<tr style=\"height: 39.1875px;\">\n<td class=\"sign\" style=\"text-align: center; height: 97.9688px; border-width: 1px; border-color: rgb(0, 0, 0); padding: 5px;\">[owp_initial]</td>\n<td style=\"text-align: center; height: 97.9688px; border-width: 1px; border-color: rgb(0, 0, 0); padding: 5px;\"><input style=\"transform: scale(1.25); text-align: center;\" checked=\"checked\" name=\"agree-instructor-line-9\" type=\"checkbox\" value=\"agreed\"></td>\n<td style=\"height: 39.1875px; border-width: 1px; border-color: rgb(0, 0, 0); padding: 5px;\"><strong>Boarding, falling off, capsizing, taking on water, re-boarding and emergency </strong><strong>procedures for dealing with these situations</strong></td>\n</tr>\n<tr style=\"height: 19.5938px;\">\n<td class=\"sign\" style=\"text-align: center; height: 97.9688px; border-width: 1px; border-color: rgb(0, 0, 0); padding: 5px;\">[owp_initial]</td>\n<td style=\"text-align: center; height: 97.9688px; border-width: 1px; border-color: rgb(0, 0, 0); padding: 5px;\"><input style=\"transform: scale(1.25); text-align: center;\" checked=\"checked\" name=\"agree-instructor-line-10\" type=\"checkbox\" value=\"agreed\"></td>\n<td style=\"height: 19.5938px; border-width: 1px; border-color: rgb(0, 0, 0); padding: 5px;\"><strong>Problems seeing other vessels and being seen by them</strong></td>\n</tr>\n<tr style=\"height: 19.5938px;\">\n<td class=\"sign\" style=\"text-align: center; height: 97.9688px; border-width: 1px; border-color: rgb(0, 0, 0); padding: 5px;\">[owp_initial]</td>\n<td style=\"text-align: center; height: 97.9688px; border-width: 1px; border-color: rgb(0, 0, 0); padding: 5px;\"><input style=\"transform: scale(1.25); text-align: center;\" checked=\"checked\" name=\"agree-instructor-line-11\" type=\"checkbox\" value=\"agreed\"></td>\n<td style=\"height: 19.5938px; border-width: 1px; border-color: rgb(0, 0, 0); padding: 5px;\"><strong>The dangers of wake or surf jumping and other reckless operations.</strong></td>\n</tr>\n<tr style=\"height: 19.5938px;\">\n<td class=\"sign\" style=\"text-align: center; height: 97.9688px; border-width: 1px; border-color: rgb(0, 0, 0); padding: 5px;\">[owp_initial]</td>\n<td style=\"text-align: center; height: 97.9688px; border-width: 1px; border-color: rgb(0, 0, 0); padding: 5px;\"><input style=\"transform: scale(1.25); text-align: center;\" checked=\"checked\" name=\"agree-instructor-line-11\" type=\"checkbox\" value=\"agreed\"></td>\n<td style=\"height: 19.5938px; border-width: 1px; border-color: rgb(0, 0, 0); padding: 5px;\"><strong>Boating safety identification cards, age and engine requirements</strong></td>\n</tr>\n<tr style=\"height: 19.5938px;\">\n<td class=\"sign\" style=\"text-align: center; height: 97.9688px; border-width: 1px; border-color: rgb(0, 0, 0); padding: 5px;\">[owp_initial]</td>\n<td style=\"text-align: center; height: 97.9688px; border-width: 1px; border-color: rgb(0, 0, 0); padding: 5px;\"><input style=\"transform: scale(1.25); text-align: center;\" checked=\"checked\" name=\"agree-instructor-line-12\" type=\"checkbox\" value=\"agreed\"></td>\n<td style=\"height: 19.5938px; border-width: 1px; border-color: rgb(0, 0, 0); padding: 5px;\"><strong>Photographic identification</strong></td>\n</tr>\n<tr style=\"height: 58.7812px;\">\n<td class=\"sign\" style=\"text-align: center; height: 97.9688px; border-width: 1px; border-color: rgb(0, 0, 0); padding: 5px;\">[owp_initial]</td>\n<td style=\"text-align: center; height: 97.9688px; border-width: 1px; border-color: rgb(0, 0, 0); padding: 5px;\"><input style=\"transform: scale(1.25); text-align: center;\" checked=\"checked\" name=\"agree-instructor-line-13\" type=\"checkbox\" value=\"agreed\"></td>\n<td style=\"height: 58.7812px; border-width: 1px; border-color: rgb(0, 0, 0); padding: 5px;\"><strong>Boating Accidents:</strong><br>Causes and prevention of accidents; Legal requirements: remain on-scene, render assistance, report&nbsp;incident to authorities</td>\n</tr>\n<tr style=\"height: 19.5938px;\">\n<td class=\"sign\" style=\"text-align: center; height: 97.9688px; border-width: 1px; border-color: rgb(0, 0, 0); padding-top: 5px; padding-right: 5px; padding-bottom: 5px;\">[owp_initial]</td>\n<td style=\"text-align: center; height: 97.9688px; border-width: 1px; border-color: rgb(0, 0, 0); padding: 5px;\"><input style=\"transform: scale(1.25); text-align: center;\" checked=\"checked\" name=\"agree-instructor-line-14\" type=\"checkbox\" value=\"agreed\"></td>\n<td style=\"height: 19.5938px; border-width: 1px; border-color: rgb(0, 0, 0); padding: 5px;\"><strong>Florida divers-down warning device requirements</strong></td>\n</tr>\n<tr style=\"height: 19.5938px;\">\n<td class=\"sign\" style=\"text-align: center; height: 97.9688px; border-width: 1px; border-color: rgb(0, 0, 0); padding: 5px;\">[owp_initial]</td>\n<td style=\"text-align: center; height: 97.9688px; border-width: 1px; border-color: rgb(0, 0, 0); padding: 5px;\"><input style=\"transform: scale(1.25); text-align: center;\" checked=\"checked\" name=\"agree-instructor-line-14\" type=\"checkbox\" value=\"agreed\"></td>\n<td style=\"height: 19.5938px; border-width: 1px; border-color: rgb(0, 0, 0); padding: 5px;\"><strong>Noise, nuisances and other environmental concerns</strong></td>\n</tr>\n<tr style=\"height: 19.5938px;\">\n<td class=\"sign\" style=\"text-align: center; height: 97.9688px; border-width: 1px; border-color: rgb(0, 0, 0); padding: 5px;\">[owp_initial]</td>\n<td style=\"text-align: center; height: 97.9688px; border-width: 1px; border-color: rgb(0, 0, 0); padding: 5px;\"><input style=\"transform: scale(1.25); text-align: center;\" checked=\"checked\" name=\"agree-instructor-line-15\" type=\"checkbox\" value=\"agreed\"></td>\n<td style=\"height: 19.5938px; border-width: 1px; border-color: rgb(0, 0, 0); padding: 5px;\"><strong>Manatee awareness (if applicable to location)</strong></td>\n</tr>\n<tr style=\"height: 19.5938px;\">\n<td class=\"sign\" style=\"text-align: center; height: 97.9688px; border-width: 1px; border-color: rgb(0, 0, 0); padding: 5px;\">[owp_initial]</td>\n<td style=\"text-align: center; height: 97.9688px; border-width: 1px; border-color: rgb(0, 0, 0); padding: 5px;\"><input style=\"transform: scale(1.25); text-align: center;\" checked=\"checked\" name=\"agree-instructor-line-16\" type=\"checkbox\" value=\"agreed\"></td>\n<td style=\"height: 19.5938px; border-width: 1px; border-color: rgb(0, 0, 0); padding: 5px;\"><strong>Ecosystem awareness based on local issues</strong></td>\n</tr>\n<tr style=\"height: 19.5938px;\">\n<td class=\"sign\" style=\"text-align: center; height: 97.9688px; border-width: 1px; border-color: rgb(0, 0, 0); padding: 5px;\">[owp_initial]</td>\n<td style=\"text-align: center; height: 97.9688px; border-width: 1px; border-color: rgb(0, 0, 0); padding: 5px;\"><input style=\"transform: scale(1.25); text-align: center;\" checked=\"checked\" name=\"agree-instructor-line-17\" type=\"checkbox\" value=\"agreed\"></td>\n<td style=\"height: 19.5938px; border-width: 1px; border-color: rgb(0, 0, 0); padding: 5px;\"><strong>Specific operational characteristics of the vessel being leased or rented</strong></td>\n</tr>\n<tr style=\"height: 58.7812px;\">\n<td class=\"sign\" style=\"text-align: center; height: 97.9688px; border-width: 1px; border-color: rgb(0, 0, 0); padding: 5px;\">[owp_initial]</td>\n<td style=\"text-align: center; height: 97.9688px; border-width: 1px; border-color: rgb(0, 0, 0); padding: 5px;\"><input style=\"transform: scale(1.25); text-align: center;\" checked=\"checked\" name=\"agree-instructor-line-18\" type=\"checkbox\" value=\"agreed\"></td>\n<td style=\"height: 58.7812px; border-width: 1px; border-color: rgb(0, 0, 0); padding: 5px;\"><strong>Local characteristics of the waterway where the leased or rented vessel is&nbsp;intended to be operated, to include:<br></strong>Navigational hazards; Boating restricted areas; Water depths</td>\n</tr>\n<tr style=\"height: 19.5938px;\">\n<td style=\"height: 19.5938px; border-width: 1px; border-color: rgb(0, 0, 0); padding: 5px;\">&nbsp;</td>\n<td style=\"height: 19.5938px; border-width: 1px; border-color: rgb(0, 0, 0); padding: 5px;\">&nbsp;</td>\n<td style=\"height: 19.5938px; border-width: 1px; border-color: rgb(0, 0, 0); padding: 5px;\"><strong>Personal watercraft</strong></td>\n</tr>\n<tr style=\"height: 78.375px;\">\n<td class=\"sign\" style=\"text-align: center; height: 97.9688px; border-width: 1px; border-color: rgb(0, 0, 0); padding-top: 5px; padding-right: 5px; padding-bottom: 5px;\">[owp_initial]</td>\n<td style=\"text-align: center; height: 97.9688px; border-width: 1px; border-color: rgb(0, 0, 0); padding: 5px;\"><input style=\"transform: scale(1.25); text-align: center;\" checked=\"checked\" name=\"agree-instructor-line-3\" type=\"checkbox\" value=\"agreed\"></td>\n<td style=\"height: 78.375px; border-width: 1px; border-color: rgb(0, 0, 0); padding: 5px;\"><strong>Specific personal watercraft (PWC) safety requirements:<br></strong>Required to wear PFD; Required use of kill switch lanyard; Location of sound producing device and fire&nbsp;extinguisher; Minimum age to legally operate; Lawful hours of operation</td>\n</tr>\n<tr style=\"height: 19.5938px;\">\n<td style=\"height: 19.5938px; border-width: 1px; border-color: rgb(0, 0, 0); padding: 5px;\">&nbsp;</td>\n<td style=\"height: 19.5938px; border-width: 1px; border-color: rgb(0, 0, 0); padding: 5px;\">&nbsp;</td>\n<td style=\"height: 19.5938px; border-width: 1px; border-color: rgb(0, 0, 0); padding: 5px;\"><strong>Paddlecraft</strong></td>\n</tr>\n<tr style=\"height: 39.1875px;\">\n<td class=\"sign\" style=\"text-align: center; height: 97.9688px; border-width: 1px; border-color: rgb(0, 0, 0); padding: 5px;\">[owp_initial]</td>\n<td style=\"text-align: center; height: 97.9688px; border-width: 1px; border-color: rgb(0, 0, 0); padding: 5px;\"><input style=\"transform: scale(1.25); text-align: center;\" checked=\"checked\" name=\"agree-instructor-line-3\" type=\"checkbox\" value=\"agreed\"></td>\n<td style=\"height: 39.1875px; border-width: 1px; border-color: rgb(0, 0, 0); padding: 5px;\">Requirements for operating paddlecraft within the marked channel of the intracoastal waterway</td>\n</tr>\n<tr style=\"height: 19.5938px;\">\n<td style=\"height: 19.5938px; border-width: 1px; border-color: rgb(0, 0, 0); padding: 5px;\">&nbsp;</td>\n<td style=\"height: 19.5938px; border-width: 1px; border-color: rgb(0, 0, 0); padding: 5px;\">&nbsp;</td>\n<td style=\"height: 19.5938px; border-width: 1px; border-color: rgb(0, 0, 0); padding: 5px;\"><strong>Off-Site or extended period use</strong></td>\n</tr>\n<tr style=\"height: 78.375px;\">\n<td class=\"sign\" style=\"text-align: center; height: 97.9688px; border-width: 1px; border-color: rgb(0, 0, 0); padding: 5px;\">[owp_initial]</td>\n<td style=\"text-align: center; height: 97.9688px; border-width: 1px; border-color: rgb(0, 0, 0); padding: 5px;\"><input style=\"transform: scale(1.25); text-align: center;\" checked=\"checked\" name=\"agree-instructor-line-3\" type=\"checkbox\" value=\"agreed\"></td>\n<td style=\"height: 78.375px; border-width: 1px; border-color: rgb(0, 0, 0); padding: 5px;\"><strong>Instruction on care and maintenance of the leased or rented vessel:<br></strong>Fueling and ventilation; Trailering and transporting; Float plans; how and when to complete a float plan;&nbsp;Specific local hazards, e.g.: bodies of water, weather, dams, cold water, commercial vessel traffic</td>\n</tr>\n<tr style=\"height: 58.7812px;\">\n<td class=\"sign\" style=\"text-align: center; height: 97.9688px; border-width: 1px; border-color: rgb(0, 0, 0); padding: 5px;\">[owp_initial]</td>\n<td style=\"text-align: center; height: 97.9688px; border-width: 1px; border-color: rgb(0, 0, 0); padding: 5px;\"><input style=\"transform: scale(1.25); text-align: center;\" checked=\"checked\" name=\"agree-instructor-line-3\" type=\"checkbox\" value=\"agreed\"></td>\n<td style=\"height: 58.7812px; border-width: 1px; border-color: rgb(0, 0, 0); padding: 5px;\"><strong>Conducted an on-the-water demonstration and check ride to verify the<br>prospective operator&rsquo;s ability to safely operate the vessel to be leased or rented</strong></td>\n</tr>\n</tbody>\n</table>\n</form>\n<p>&nbsp;</p>\n</div>"
  },
  {
    "type": "header",
    "subtype": "h2",
    "label": "<h4 id=\"control-5041586\" style=\"--tw-border-spacing-x: 0; --tw-border-spacing-y: 0; --tw-translate-x: 0; --tw-translate-y: 0; --tw-rotate: 0; --tw-skew-x: 0; --tw-skew-y: 0; --tw-scale-x: 1; --tw-scale-y: 1; --tw-pan-x: ; --tw-pan-y: ; --tw-pinch-zoom: ; --tw-scroll-snap-strictness: proximity; --tw-ordinal: ; --tw-slashed-zero: ; --tw-numeric-figure: ; --tw-numeric-spacing: ; --tw-numeric-fraction: ; --tw-ring-inset: ; --tw-ring-offset-width: 0px; --tw-ring-offset-color: #fff; --tw-ring-color: rgba(63,131,248,.5); --tw-ring-offset-shadow: 0 0 #0000; --tw-ring-shadow: 0 0 #0000; --tw-shadow: 0 0 #0000; --tw-shadow-colored: 0 0 #0000; --tw-blur: ; --tw-brightness: ; --tw-contrast: ; --tw-grayscale: ; --tw-hue-rotate: ; --tw-invert: ; --tw-saturate: ; --tw-sepia: ; --tw-drop-shadow: ; --tw-backdrop-blur: ; --tw-backdrop-brightness: ; --tw-backdrop-contrast: ; --tw-backdrop-grayscale: ; --tw-backdrop-hue-rotate: ; --tw-backdrop-invert: ; --tw-backdrop-opacity: ; --tw-backdrop-saturate: ; --tw-backdrop-sepia: ; font-size: medium; font-weight: 700; font-family: ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, &quot;Segoe UI&quot;, Roboto, &quot;Helvetica Neue&quot;, Arial, &quot;Noto Sans&quot;, sans-serif, &quot;Apple Color Emoji&quot;, &quot;Segoe UI Emoji&quot;, &quot;Segoe UI Symbol&quot;, &quot;Noto Color Emoji&quot;;\">Name of Livery Instructor and Signature</h4>"
  },
  {
    "type": "text",
    "required": true,
    "label": "First Name",
    "placeholder": "First Name",
    "className": "block w-full p-2.5 border border-gray-300 text-gray-900 rounded-md",
    "name": "livery-f-name",
    "subtype": "text"
  },
  {
    "type": "text",
    "required": true,
    "label": "Last Name",
    "placeholder": "Last Name",
    "className": "block w-full p-2.5 border border-gray-300 text-gray-900 rounded-md",
    "name": "livery-l-name",
    "subtype": "text"
  },
  {
    "type": "date",
    "required": true,
    "label": "Date of Birth",
    "placeholder": "dd/mm/yyyy",
    "className": "block w-full p-2.5 border border-gray-300 text-gray-900 rounded-md",
    "name": "date-1701925858215-0"
  },
  {
    "type": "signature",
    "required": true,
    "label": "<span style=\"font-family: ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, &quot;Segoe UI&quot;, Roboto, &quot;Helvetica Neue&quot;, Arial, &quot;Noto Sans&quot;, sans-serif, &quot;Apple Color Emoji&quot;, &quot;Segoe UI Emoji&quot;, &quot;Segoe UI Symbol&quot;, &quot;Noto Color Emoji&quot;; font-size: medium;\">I hereby acknowledge I have provided the required pre-rental and pre-ride instruction as specifically acknowledged above</span>",
    "name": "signature-1701926018041-0"
  },
  {
    "type": "header",
    "subtype": "h2",
    "label": "<h4 id=\"control-1439674\" style=\"--tw-border-spacing-x: 0; --tw-border-spacing-y: 0; --tw-translate-x: 0; --tw-translate-y: 0; --tw-rotate: 0; --tw-skew-x: 0; --tw-skew-y: 0; --tw-scale-x: 1; --tw-scale-y: 1; --tw-pan-x: ; --tw-pan-y: ; --tw-pinch-zoom: ; --tw-scroll-snap-strictness: proximity; --tw-ordinal: ; --tw-slashed-zero: ; --tw-numeric-figure: ; --tw-numeric-spacing: ; --tw-numeric-fraction: ; --tw-ring-inset: ; --tw-ring-offset-width: 0px; --tw-ring-offset-color: #fff; --tw-ring-color: rgba(63,131,248,.5); --tw-ring-offset-shadow: 0 0 #0000; --tw-ring-shadow: 0 0 #0000; --tw-shadow: 0 0 #0000; --tw-shadow-colored: 0 0 #0000; --tw-blur: ; --tw-brightness: ; --tw-contrast: ; --tw-grayscale: ; --tw-hue-rotate: ; --tw-invert: ; --tw-saturate: ; --tw-sepia: ; --tw-drop-shadow: ; --tw-backdrop-blur: ; --tw-backdrop-brightness: ; --tw-backdrop-contrast: ; --tw-backdrop-grayscale: ; --tw-backdrop-hue-rotate: ; --tw-backdrop-invert: ; --tw-backdrop-opacity: ; --tw-backdrop-saturate: ; --tw-backdrop-sepia: ; font-size: medium; font-weight: 700; font-family: ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, &quot;Segoe UI&quot;, Roboto, &quot;Helvetica Neue&quot;, Arial, &quot;Noto Sans&quot;, sans-serif, &quot;Apple Color Emoji&quot;, &quot;Segoe UI Emoji&quot;, &quot;Segoe UI Symbol&quot;, &quot;Noto Color Emoji&quot;;\">Renter Name and Signature</h4>"
  },
  {
    "type": "text",
    "required": true,
    "label": "First Name",
    "placeholder": "First Name",
    "className": "block w-full p-2.5 border border-gray-300 text-gray-900 rounded-md",
    "name": "text-1701926052647-0",
    "subtype": "text"
  },
  {
    "type": "text",
    "required": true,
    "label": "Last Name",
    "placeholder": "Last Name",
    "className": "block w-full p-2.5 border border-gray-300 text-gray-900 rounded-md",
    "name": "text-1701926052650-0",
    "subtype": "text"
  },
  {
    "type": "date",
    "required": true,
    "label": "Date",
    "placeholder": "dd/mm/yyyy",
    "className": "block w-full p-2.5 border border-gray-300 text-gray-900 rounded-md",
    "name": "date-1701926052662-0"
  },
  {
    "type": "signature",
    "required": true,
    "label": "<span style=\"font-family: ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, &quot;Segoe UI&quot;, Roboto, &quot;Helvetica Neue&quot;, Arial, &quot;Noto Sans&quot;, sans-serif, &quot;Apple Color Emoji&quot;, &quot;Segoe UI Emoji&quot;, &quot;Segoe UI Symbol&quot;, &quot;Noto Color Emoji&quot;; font-size: medium;\">I hereby acknowledge I have received the required pre-rental and pre-ride instruction as specifically acknowledged above, and I understand the rules and information provided in this orientation.</span>",
    "name": "signature-1701926052666-0"
  }
]

export function htmlModal(index) {
  return (`<div
      id="initials-${index}" class="init-${index} cursor-pointer relative border border-solid border-gray-500 w-28 h-16 rounded-2xl mx-auto">
      <small class="text-xs absolute bg-white bottom-[90%] px-1 right-[18%]"> Initial Sign </small>
    </div><div id="init-${index}-modal" data-modal-backdrop="static" tabindex="-1" class="modal h-screen bg-black bg-opacity-50 fixed hidden top-0 left-0 right-0 z-50 w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)] max-h-full justify-center items-center flex" aria-modal="true" role="dialog">
                <div class="relative w-[400px] max-h-full">
                    <!-- Modal content -->
                    <div class="relative bg-white rounded-lg shadow">
                        <!-- Modal header -->
                        <div class="flex items-start justify-between p-4 border-b rounded-t ">
                            <h3 class="text-xl font-semibold text-gray-900 ">
                                Sign your initial
                            </h3>
                        </div>
                        <!-- Modal body -->
                        <div class=px-6>
                            <div class="js-signature initial-signature-pad"></div>
                        </div>
                        <!-- Modal footer -->
                        <div class="flex justify-between items-center p-6 space-x-2 border-t border-gray-200 rounded-b ">
                            <div class="space-x-2">
                                <button id="done-${index}-done" type="button" class="done-${index} text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center ">
                                    Done
                                </button>
                                <button id="cac-${index}-cancel" type="button" class="cac-${index} text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5">
                                    Cancel
                                </button>
                            </div>
                            <button id="clear-${index}-clear" type="button" class="clear-${index} focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5">
                                Clear
                            </button>

                        </div>
                    </div>
                </div>
            </div>`)
}

export function additionParticipantForm(data, email = null) {
  return `<form class="space-y-2" id="myForm">
          ${(data.f_name || data.showFirstName) ? `<div class="mt-3">
            <label for="f_name" class='text-sm text-gray-900 whitespace-nowrap'>First name</label>
            <input type="text" name="f_name"  value="" placeholder="First name" class="block w-full p-2.5 border border-gray-300 text-gray-900 rounded-md" />
          </div>` : ''}
          ${(data.m_name || data.showMiddleName) ? `<div class="mt-3">
            <label for="m_name" class='text-sm text-gray-900 whitespace-nowrap'>Middle name</label>
            <input type="text" name="m_name"  value="" placeholder="Last name" class="block w-full p-2.5 border border-gray-300 text-gray-900 rounded-md" />
          </div>` : ''}
          ${(data.l_name || data.showLastName) ? `<div class="mt-3">
            <label for="l_name" class='text-sm text-gray-900 whitespace-nowrap'>Last name</label>
            <input type="text" name="l_name"  value="" placeholder="Last name" class="block w-full p-2.5 border border-gray-300 text-gray-900 rounded-md" />
          </div>` : ''}
          ${(data.phone || data.showPhone) ? `<div class="mt-3">
            <label class='text-sm text-gray-900 whitespace-nowrap' for="phone">Phone</label>
            <input type="text" name="phone"  value="" placeholder="Phone" class="block w-full p-2.5 border border-gray-300 text-gray-900 rounded-md" />
          </div>` : ''}
          ${((data.email || data.showEmail) && !email) ? `<div class="mt-3">
            <label class='text-sm text-gray-900 whitespace-nowrap' for="email">Email</label>
            <input type="email" name="email" value="" placeholder="Email" class="block w-full p-2.5 border border-gray-300 text-gray-900 rounded-md" />
          </div>` : ''}
          ${(data.date_of_birth || data.showDateOfBirth) ? `<div class="mt-3">
            <h2 class="text-sm">Date of Birth</h2>
            <div class="flex items-center space-x-2">
              <input type="date" value="" name="date_of_birth" class="block w-full p-2.5 border border-gray-300 text-gray-900 rounded-md" />
            </div>
          </div>` : ''}
          ${(data.signature || data.showSignature) ? `<div class="relative min-h-[200px] sign-container">
          <h3 class="text-sm text-gray-900 whitespace-nowrap">Signature</h3>
        <div class="adult">
        <div class="absolute inset-0 flex items-center justify-center cursor-pointer" onclick="this.remove();">
          <h5 class="text-gray-400 text-center flex gap-1">
          <svg width="23" height="22" viewBox="0 0 23 22" fill="none"><path fill-rule="evenodd" clip-rule="evenodd" d="M17.5257 0.237081C16.835 0.442777 16.1908 0.95511 15.8837 1.54293C15.4656 2.343 9.06524 15.5794 9.025 15.7272C8.96802 15.9365 9.08443 19.371 9.15661 19.6086C9.18228 19.6932 9.25289 19.8355 9.31351 19.9248L9.42372 20.0872L9.24937 20.4388C9.15347 20.6321 9.07502 20.83 9.07502 20.8786C9.07502 21.1367 9.35701 21.4246 9.60951 21.4243C9.8327 21.424 9.99239 21.282 10.1726 20.9236L10.3405 20.5897L10.573 20.5657C10.7008 20.5525 10.8926 20.5031 10.9992 20.456C11.3238 20.3124 13.9805 18.3386 14.113 18.1426C14.1763 18.0489 15.5215 15.3074 17.1022 12.0504C18.683 8.7934 19.9899 6.12012 20.0067 6.10979C20.0317 6.09428 20.3343 6.19921 20.3761 6.23792C20.3829 6.24423 19.8055 7.45041 19.0929 8.91832C18.3803 10.3863 17.7865 11.6533 17.7735 11.7339C17.7286 12.0105 17.9943 12.3167 18.2796 12.3171C18.4339 12.3173 18.6189 12.22 18.7002 12.0958C18.7358 12.0415 19.5678 10.3437 20.5492 8.32296C21.6998 5.95357 22.3334 4.60316 22.3334 4.52035C22.3334 4.23209 22.1037 4.00331 21.8144 4.00331C21.5566 4.00331 21.4491 4.11594 21.1474 4.70207C20.9959 4.99621 20.8596 5.24918 20.8444 5.26421C20.8292 5.27925 20.7399 5.25235 20.646 5.20445L20.4752 5.11736L20.7735 4.49256C21.1491 3.70578 21.2521 3.32171 21.2194 2.82916C21.1434 1.68538 20.3304 0.678717 19.1777 0.301213C18.7239 0.152617 17.9147 0.121187 17.5257 0.237081ZM19.1315 1.42419C19.5539 1.63349 19.8229 1.90489 20.0202 2.32051C20.1359 2.56429 20.1509 2.63952 20.1514 2.97708L20.1519 3.35831L19.5589 4.5827C19.2327 5.25612 18.8324 6.07912 18.6694 6.41159L18.3728 7.0161L16.7632 6.23436C15.8779 5.80442 15.1568 5.43873 15.1608 5.42175C15.1921 5.28666 16.8568 1.92725 16.9493 1.8122C17.1116 1.61053 17.4117 1.40098 17.6823 1.30038C17.8656 1.23218 17.9866 1.21968 18.341 1.23227C18.7506 1.24675 18.7952 1.2576 19.1315 1.42419ZM17.2971 7.66962L17.9157 7.97545L15.6398 12.6561L13.364 17.3368L13.1998 17.3254C12.5765 17.2822 11.5801 16.9039 10.9336 16.4649C10.7917 16.3685 10.5526 16.1727 10.4023 16.0296L10.129 15.7695L12.4035 11.0832L14.678 6.39685L15.6783 6.88034C16.2284 7.14627 16.9569 7.50145 17.2971 7.66962ZM0.963262 6.57349C0.74418 6.67015 0.666748 6.79338 0.666748 7.0452C0.666748 7.23603 0.685555 7.29059 0.788276 7.3978C0.931619 7.54745 0.948055 7.5516 2.38229 7.80356C3.58292 8.01446 4.1033 8.13891 4.65663 8.34753C5.48433 8.65963 6.12624 9.16659 6.38387 9.71171C6.55089 10.0651 6.58181 10.2194 6.58003 10.6916C6.57677 11.5684 6.22485 12.4517 4.94514 14.7953C3.69424 17.0859 3.30377 17.9601 3.1204 18.8802C2.86307 20.1713 3.44504 21.0201 4.81794 21.3561C5.26826 21.4663 5.81355 21.5089 6.77378 21.509L7.71305 21.5092L7.84055 21.4019C8.10415 21.18 8.10415 20.8217 7.84055 20.5999C7.71775 20.4965 7.69158 20.4926 7.13383 20.4922C6.36985 20.4917 5.45684 20.4238 5.07938 20.3394C4.68789 20.2519 4.3123 20.054 4.20343 19.8779C4.01604 19.5747 4.14655 18.803 4.54006 17.8875C4.77643 17.3375 5.06587 16.7742 5.88928 15.2612C6.86646 13.4657 7.26934 12.5833 7.49448 11.7454C7.59504 11.3711 7.60847 11.2429 7.60999 10.6441C7.61156 10.0082 7.60436 9.9454 7.49304 9.62788C7.3339 9.17375 7.12765 8.8461 6.75658 8.45767C6.14581 7.81838 5.35929 7.40813 4.11901 7.08184C3.79306 6.99611 1.2139 6.5097 1.11707 6.51571C1.10237 6.51665 1.03315 6.54261 0.963262 6.57349ZM10.4305 17.3912C10.794 17.6388 11.5563 18.0045 11.9656 18.1277C12.1459 18.182 12.2889 18.2391 12.2833 18.2548C12.2777 18.2704 11.9036 18.5532 11.4519 18.8832C10.5767 19.5226 10.4401 19.587 10.2633 19.4439C10.1686 19.3672 10.1593 19.3224 10.1291 18.7939C10.0703 17.7676 10.0634 17.15 10.111 17.1778C10.1353 17.192 10.2791 17.2881 10.4305 17.3912Z" fill="#9CA3AF"></path></svg>
          &nbsp;&nbsp;Click to sign</h5>
        </div>
        <button type="button" onclick="$('.js-signature').jqSignature('clearCanvas');" class="w-7 h-7 flex justify-center items-center border border-gray-500 ml-auto text-gray-500 rounded-full">X</button>
        <div class="js-signature"></div>
        </div>
</div>` : ''}
        </form>`
}

const templates = {
  primaryAdultParticipant: function (fieldData) {
    return {
      onRender: function () {
        let element = $(`.field-${fieldData.name}`);
        element.append(additionParticipantForm(fieldData, 'email'));
        $('.js-signature').jqSignature({autoFit: true, height: 200, border: '1px dashed #D1D5DB', lineWidth: 3});
      }
    };
  },
  additionalParticipants: function (fieldData) {
    let newDiv = $('<div class="participant-div-1"></div>');
    return {
      field: '<h2 class="text-xl font-semibold text-center py-4">How many additional adults?</h2>',
      onRender: function () {
        commonPayload(additionParticipantForm(fieldData), newDiv, fieldData);
      }
    };
  },
  additionalMinors: function (fieldData) {
    let newDiv = $('<div class="minor-div-1"></div>');
    return {
      field: `<h2 class="text-xl font-semibold text-center py-4"> How many minors are you consenting for?</h2>`,
      onRender: function () {
        commonPayload(additionMinorForm, newDiv, fieldData);
      }
    };
  },
  signature: function (fieldData) {
    return {
      onRender: function () {
        let element = $(`.field-${fieldData.name}`);
        element.append(`
        <div class="relative main">
        <div class="absolute w-full h-full cursor-pointer align-middle" onclick="this.remove();">
          <h5 style="display: flex; justify-content: center; height: 100%; align-items: center; color: #9CA3AF;">
          <svg width="23" height="22" viewBox="0 0 23 22" fill="none"><path fill-rule="evenodd" clip-rule="evenodd" d="M17.5257 0.237081C16.835 0.442777 16.1908 0.95511 15.8837 1.54293C15.4656 2.343 9.06524 15.5794 9.025 15.7272C8.96802 15.9365 9.08443 19.371 9.15661 19.6086C9.18228 19.6932 9.25289 19.8355 9.31351 19.9248L9.42372 20.0872L9.24937 20.4388C9.15347 20.6321 9.07502 20.83 9.07502 20.8786C9.07502 21.1367 9.35701 21.4246 9.60951 21.4243C9.8327 21.424 9.99239 21.282 10.1726 20.9236L10.3405 20.5897L10.573 20.5657C10.7008 20.5525 10.8926 20.5031 10.9992 20.456C11.3238 20.3124 13.9805 18.3386 14.113 18.1426C14.1763 18.0489 15.5215 15.3074 17.1022 12.0504C18.683 8.7934 19.9899 6.12012 20.0067 6.10979C20.0317 6.09428 20.3343 6.19921 20.3761 6.23792C20.3829 6.24423 19.8055 7.45041 19.0929 8.91832C18.3803 10.3863 17.7865 11.6533 17.7735 11.7339C17.7286 12.0105 17.9943 12.3167 18.2796 12.3171C18.4339 12.3173 18.6189 12.22 18.7002 12.0958C18.7358 12.0415 19.5678 10.3437 20.5492 8.32296C21.6998 5.95357 22.3334 4.60316 22.3334 4.52035C22.3334 4.23209 22.1037 4.00331 21.8144 4.00331C21.5566 4.00331 21.4491 4.11594 21.1474 4.70207C20.9959 4.99621 20.8596 5.24918 20.8444 5.26421C20.8292 5.27925 20.7399 5.25235 20.646 5.20445L20.4752 5.11736L20.7735 4.49256C21.1491 3.70578 21.2521 3.32171 21.2194 2.82916C21.1434 1.68538 20.3304 0.678717 19.1777 0.301213C18.7239 0.152617 17.9147 0.121187 17.5257 0.237081ZM19.1315 1.42419C19.5539 1.63349 19.8229 1.90489 20.0202 2.32051C20.1359 2.56429 20.1509 2.63952 20.1514 2.97708L20.1519 3.35831L19.5589 4.5827C19.2327 5.25612 18.8324 6.07912 18.6694 6.41159L18.3728 7.0161L16.7632 6.23436C15.8779 5.80442 15.1568 5.43873 15.1608 5.42175C15.1921 5.28666 16.8568 1.92725 16.9493 1.8122C17.1116 1.61053 17.4117 1.40098 17.6823 1.30038C17.8656 1.23218 17.9866 1.21968 18.341 1.23227C18.7506 1.24675 18.7952 1.2576 19.1315 1.42419ZM17.2971 7.66962L17.9157 7.97545L15.6398 12.6561L13.364 17.3368L13.1998 17.3254C12.5765 17.2822 11.5801 16.9039 10.9336 16.4649C10.7917 16.3685 10.5526 16.1727 10.4023 16.0296L10.129 15.7695L12.4035 11.0832L14.678 6.39685L15.6783 6.88034C16.2284 7.14627 16.9569 7.50145 17.2971 7.66962ZM0.963262 6.57349C0.74418 6.67015 0.666748 6.79338 0.666748 7.0452C0.666748 7.23603 0.685555 7.29059 0.788276 7.3978C0.931619 7.54745 0.948055 7.5516 2.38229 7.80356C3.58292 8.01446 4.1033 8.13891 4.65663 8.34753C5.48433 8.65963 6.12624 9.16659 6.38387 9.71171C6.55089 10.0651 6.58181 10.2194 6.58003 10.6916C6.57677 11.5684 6.22485 12.4517 4.94514 14.7953C3.69424 17.0859 3.30377 17.9601 3.1204 18.8802C2.86307 20.1713 3.44504 21.0201 4.81794 21.3561C5.26826 21.4663 5.81355 21.5089 6.77378 21.509L7.71305 21.5092L7.84055 21.4019C8.10415 21.18 8.10415 20.8217 7.84055 20.5999C7.71775 20.4965 7.69158 20.4926 7.13383 20.4922C6.36985 20.4917 5.45684 20.4238 5.07938 20.3394C4.68789 20.2519 4.3123 20.054 4.20343 19.8779C4.01604 19.5747 4.14655 18.803 4.54006 17.8875C4.77643 17.3375 5.06587 16.7742 5.88928 15.2612C6.86646 13.4657 7.26934 12.5833 7.49448 11.7454C7.59504 11.3711 7.60847 11.2429 7.60999 10.6441C7.61156 10.0082 7.60436 9.9454 7.49304 9.62788C7.3339 9.17375 7.12765 8.8461 6.75658 8.45767C6.14581 7.81838 5.35929 7.40813 4.11901 7.08184C3.79306 6.99611 1.2139 6.5097 1.11707 6.51571C1.10237 6.51665 1.03315 6.54261 0.963262 6.57349ZM10.4305 17.3912C10.794 17.6388 11.5563 18.0045 11.9656 18.1277C12.1459 18.182 12.2889 18.2391 12.2833 18.2548C12.2777 18.2704 11.9036 18.5532 11.4519 18.8832C10.5767 19.5226 10.4401 19.587 10.2633 19.4439C10.1686 19.3672 10.1593 19.3224 10.1291 18.7939C10.0703 17.7676 10.0634 17.15 10.111 17.1778C10.1353 17.192 10.2791 17.2881 10.4305 17.3912Z" fill="#9CA3AF"></path></svg>
          &nbsp;&nbsp;Click to sign</h5>
        </div>
       <button type="button" onclick="$('.js-signature').jqSignature('clearCanvas');" class="w-7 h-7 flex justify-center items-center border border-gray-500 ml-auto text-gray-500 rounded-full">X</button>
        <div class="js-signature"></div>
        </div>
      `);
        $('.js-signature').jqSignature({autoFit: true, height: 200, border: '1px solid transparent', lineWidth: 3});
      }
    };
  },
  address: function (fieldData) {
    return {
      onRender: function () {
        let element = $(`.field-${fieldData.name}`);
        element.append(`
  <form id="address" class="space-y-4">
    <div class="flex flex-col items-start space-y-1">
      <label for="address">Address-1</label>
      <input type="text" class="block w-full p-2.5 border border-gray-300 text-gray-900 rounded-md" value="" name="address" placeholder="Address">
    </div>
    <div>
      <label for="address_2">Address 2</label>
      <input type="text" name="address_2" value="" class="block w-full p-2.5 border border-gray-300 text-gray-900 rounded-md" placeholder="Address 2">
    </div>
    <div class="w-full lg:flex items-center justify-between lg:space-x-4 space-y-4">
      <div class="w-full lg:w-1/2">
        <label for="city">City</label>
        <input type="text" name="city" value="" class="block w-full p-2.5 border border-gray-300 text-gray-900 rounded-md" placeholder="City">
      </div>
      <div class="w-full lg:w-1/2">
        <label for="state">Province / State</label>
        <input type="text" name="state" value="" class="block w-full p-2.5 border border-gray-300 text-gray-900 rounded-md" placeholder="Province / State">
      </div>
    </div>
    <div class="w-full lg:flex items-center justify-between lg:space-x-4 space-y-4">
      <div class="w-full lg:w-1/2">
        <label for="country">Country</label>
        <input type="text" name="country" value="" class="block w-full p-2.5 border border-gray-300 text-gray-900 rounded-md" placeholder="Country">
      </div>
      <div class="w-full lg:w-1/2">
        <label for="zip_code">Zip code</label>
        <input type="text" name="zip_code" value="" class="block w-full p-2.5 border border-gray-300 text-gray-900 rounded-md" placeholder="Zip code">
      </div>
    </div>
  </form>
`);
      }
    };
  },
  richTextEditor: function (fieldData) {
    return {
      onRender: function () {
        let element = $(`.field-${fieldData.name}`);
        element.append(`<textarea id=${fieldData.name} class="textarea-selector"></textarea>`);
        tinymce.init({
          selector: `#${fieldData.name}`,
          promotion: true,
          plugins: window.location.pathname.includes('view') ? '' : 'code anchor autolink charmap codesample emoticons image link lists media searchreplace table visualblocks wordcount',
          toolbar: window.location.pathname.includes('view') ? false : 'undo redo | styleselect fontselect fontsizeselect | bold italic underline strikethrough | link image media table | alignleft aligncenter alignright alignjustify | numlist bullist outdent indent | emoticons charmap | removeformat code',
          statusbar: !window.location.pathname.includes('view'),
          menubar: window.location.pathname.includes('view') ? false : 'file edit insert view format table tools help',
          contextmenu: !window.location.pathname.includes('view'),
          table_sizing_mode: 'fixed',
          contentEditable: !window.location.pathname.includes('view'),
          readonly: window.location.pathname.includes('view')
        }).then(r => console.log(r)).catch(e => console.log(e));
      }
    };
  },
  electronicSignatureConsent: function (fieldData) {
    return {
      onRender: function () {
        let element = $(`.field-${fieldData.name}`);
        element.append(`
        <div class="relative flex items-start py-4 px-2">
          <div class="flex h-5 items-center">
            <input name="electronic-signature-consent" id="electronicSign" type="checkbox" class="h-6 w-6 rounded border-gray-300 ring-primary focus:ring-primary">
          </div>
          <div class="ml-3 text-sm">
            <p class="text-gray-500">${fieldData.content}</p>
          </div>
        </div>
      `);
      }
    };
  },
  capturePhoto: function (fieldData) {
    return {
      onRender: function () {
        let element = $(`.field-${fieldData.name}`);

        function openCamera() {
          let takePhotoButton = document.getElementById('takePhoto');
          let imagePreviewDiv = document.getElementById('imagePreview');
          navigator.mediaDevices.getUserMedia({video: true})
            .then(function (stream) {
              let video = document.getElementById('video');
              video.classList.remove('hidden')
              takePhotoButton.style.display = 'inline-block';
              video.srcObject = stream;
              video.play();

              function takePicture() {
                imagePreviewDiv.innerHTML = '';
                const canvas = document.createElement('canvas');
                canvas.width = video.videoWidth;
                canvas.height = video.videoHeight;
                const ctx = canvas.getContext('2d');
                ctx.drawImage(video, 0, 0);
                const imageData = canvas.toDataURL('image/png');
                const image = document.createElement('img');
                image.id = "preview-image";
                image.src = imageData;
                imagePreviewDiv.appendChild(image);
                const tracks = stream.getTracks();
                tracks.forEach((track) => track.stop());
                video.srcObject = null;
                video.classList.add('hidden')
                takePhotoButton.style.display = 'none';
              }

              takePhotoButton.addEventListener('click', takePicture);
            })
            .catch(function (error) {
              console.log(error)
              toast.error('Failed to get access to the camera')
            });
        }

        element.append(`
        <div class="p-2 capture-photo">
          <h2 class="my-2 text-lg font-semibold text-gray-900">${fieldData.instructionHeader}</h2>
          <ul class="max-w space-y-1 text-gray-700 list-disc list-inside">
            ${fieldData.instructionLine1.length > 0 ? `<li>${fieldData.instructionLine1}</li>` : ''}
            ${fieldData.instructionLine2.length > 0 ? `<li>${fieldData.instructionLine2}</li>` : ''}
            ${fieldData.instructionLine3.length > 0 ? `<li>${fieldData.instructionLine3}</li>` : ''}
            ${fieldData.instructionLine4?.length > 0 ? `<li>${fieldData.instructionLine4}</li>` : ''}
          </ul>
          <div>
            <button id="captureButton" type="button" class="mt-5 px-3 py-2 cursor-pointer text-sm font-medium text-center text-white bg-[#66615b] rounded-lg ">${fieldData.buttonText}</button>
          </div>
           <video class="my-3 w-full hidden" id="video"></video>
           <button id="takePhoto" style="display: none" type="button" class="px-3 py-2 text-white bg-btnBg rounded-md">Take Photo</button>
           <div id="imagePreview" class="my-3"></div>
        </div>
      `);
        document.getElementById('captureButton').addEventListener('click', openCamera);
      }
    };
  },
  timeComponent: function (fieldData) {
    return {
      onRender: function () {
        let element = $(`.field-${fieldData.name}`);
        element.append('<input type="time" class="w-full p-2.5" name="time-field" id="time">');
      }
    };
  },
  filesUpload: function (fieldData) {
    return {
      onRender: function () {
        let element = $(`.field-${fieldData.name}`);
        element.append(`
        <h2 class="my-2 text-lg font-semibold text-gray-900">${fieldData.instructionHeader}</h2>
          <ul class="max-w space-y-1 text-gray-700 list-disc list-inside">
            ${fieldData.instructionLine1.length > 0 ? `<li>${fieldData.instructionLine1}</li>` : ''}
            ${fieldData.instructionLine2.length > 0 ? `<li>${fieldData.instructionLine2}</li>` : ''}
            ${fieldData.instructionLine3.length > 0 ? `<li>${fieldData.instructionLine3}</li>` : ''}
          </ul>`)
        let inputFile = $('<input>', {
          type: 'file',
          multiple: true,
          accept: "image/png, image/jpeg",
          id: `fileInput-${fieldData.name}`,
          class: 'file-inp',
          style: 'display: none',
          change: function () {
            displayUploadedFiles(fieldData.name);
          }
        });
        let openButton = $('<button>', {
          text: fieldData.buttonText,
          type: 'button',
          class: 'px-3 py-2 text-white bg-btnBg block w-fit my-4 rounded-lg',
          click: function () {
            $(`#fileInput-${fieldData.name}`).click();
          }
        });
        let fileDisplayDiv = $('<div>', {
          id: `uploadedFileDisplay-${fieldData.name}`,
          class: 'child:w-20 child:h-20 flex gap-3'
        });
        element.on('dragover', function (e) {
          e.preventDefault();
          element.addClass('drag-over');
        });
        element.on('dragleave', function () {
          element.removeClass('drag-over');
        });
        element.on('drop', function (e) {
          e.preventDefault();
          element.removeClass('drag-over');
          let files = e.originalEvent.dataTransfer.files;
          if (files.length > 0) {
            $(`#fileInput-${fieldData.name}`).prop('files', files);
            displayUploadedFiles(fieldData.name);
          }
        });
        element.append(inputFile, openButton, fileDisplayDiv);
      }
    };

    function displayUploadedFiles(fieldName) {
      let fileInput = $(`#fileInput-${fieldName}`);
      let displayDiv = $(`#uploadedFileDisplay-${fieldName}`);
      displayDiv.empty();
      if (fileInput[0].files.length > 0) {
        for (let i = 0; i < fileInput[0].files.length; i++) {
          let file = fileInput[0].files[i];
          if (file.type.startsWith('image/')) {
            let imgElement = $('<img />', {
              src: URL.createObjectURL(file),
              id: 'image-preview',
              alt: 'Uploaded Image'
            });
            displayDiv.append(imgElement);
          } else {
            displayDiv.append(`<p>File ${i + 1}: ${file.name} is not an image.</p>`);
          }
        }
      }
    }
  },
  emailInput: function (fieldData) {
    return {
      onRender: function () {
        let element = $(`.field-${fieldData.name}`);
        element.append(`
          <div>
          <input placeholder='Email' name="defaultMail" type='email' class="block w-full p-2.5 border border-gray-300 text-gray-900 rounded-md"/>
</div>
      `);
      }
    };
  }
}
const inputSets = [{
  label: 'Primary Adult Participant(editable)',
  name: 'editable',
  other: true,
  icon: '✏️',
  showHeader: true,
  userData: [],
  fields: [{
    type: 'text',
    label: 'First Name',
    className: 'block w-full p-2.5 border border-gray-300 text-gray-900 rounded-md',
    placeholder: 'First Name'
  }, {
    type: 'text',
    label: 'Last Name',
    className: 'block w-full p-2.5 border border-gray-300 text-gray-900 rounded-md',
    placeholder: 'Last Name'
  }, {
    type: 'text',
    label: 'Email',
    className: 'block w-full p-2.5 border border-gray-300 text-gray-900 rounded-md',
    subtype: 'email',
    placeholder: 'Email'
  }, {
    type: 'text',
    subtype: 'tel',
    label: 'Phone',
    className: 'block w-full p-2.5 border border-gray-300 text-gray-900 rounded-md',
    placeholder: 'Phone'
  }, {
    type: 'date',
    label: 'Date of Birth',
    className: 'block w-full p-2.5 border border-gray-300 text-gray-900 rounded-md',
    placeholder: 'dd/mm/yyyy'
  }, {
    type: 'signature', label: 'Signature'
  }]
}];
export let fields = [
  {
    label: 'Additional Participants',
    attrs: {
      type: 'additionalParticipants',
    },
    icon: '🤵',
  },
  {
    label: 'Additional Minors',
    attrs: {
      type: 'additionalMinors'
    },
    icon: '👨‍👦‍👦'
  },
  {
    label: 'Signature',
    attrs: {
      type: 'signature',
    },
    icon: '✍️',
  },
  {
    label: 'Address',
    attrs: {
      type: 'address'
    },
    icon: '🏠'
  },
  {
    label: 'Primary Adult Participant',
    attrs: {
      type: 'primaryAdultParticipant',
    },
    icon: '🤵'
  },
  {
    label: 'Rich Text Editor',
    attrs: {
      type: 'richTextEditor'
    },
    icon: '⌨️'
  },
  {
    label: 'Electronic Consent Signature',
    attrs: {
      type: 'electronicSignatureConsent'
    },
    icon: '💾'
  },
  {
    label: 'Capture Photo',
    attrs: {
      type: 'capturePhoto'
    },
    icon: '📷'
  },
  {
    label: 'Time',
    attrs: {
      type: 'timeComponent'
    },
    icon: '🕐'
  },
  {
    label: 'File Upload',
    attrs: {
      type: 'filesUpload'
    },
    icon: ' 🔗'
  }
];
export let options = {
  fields,
  templates,
  disableFields: ['autocomplete', 'button', 'paragraph', 'file', 'textarea'],
  disabledAttrs: [
    'access',
    'multiple',
    'toggle',
    'className',
    'inline',
    'other',
    'rows',
    'name',
  ],
  disabledFieldButtons: {
    richTextEditor: ['copy', 'edit'],
    emailInput: ['remove', 'copy']
  },
  stickyControls: true,
  controlPosition: 'right',
  inputSets,
  typeUserAttrs: {
    primaryAdultParticipant: {
      'showFirstName': {
        label: 'Show First Name',
        value: true,
        type: 'checkbox',
      },
      'showMiddleName': {
        label: 'Show Middle Name',
        value: true,
        type: 'checkbox',
      },
      'showLastName': {
        label: 'Show Last Name',
        value: true,
        type: 'checkbox',
      },
      'showEmail': {
        label: 'Show Email',
        value: true,
        type: 'checkbox',
      },
      'showPhone': {
        label: 'Show Phone',
        value: true,
        type: 'checkbox',
      },
      'showDateOfBirth': {
        label: 'Show Date Of Birth',
        value: true,
        type: 'checkbox',
      },
      'showSignature': {
        label: 'Show Signature',
        value: true,
        type: 'checkbox',
      }
      // 'show-scanner': {
      //   label: 'Show Scanner',
      //   value: true,
      //   type: 'checkbox',
      // },
      // 'show-age': {
      //   label: 'Show Age',
      //   value: true,
      //   type: 'checkbox',
      // },
      // 'show-address': {
      //   label: 'Show Address',
      //   value: true,
      //   type: 'checkbox',
      // }
    },
    additionalParticipants: {
      'showFirstName': {
        label: 'Show First Name',
        value: true,
        type: 'checkbox',
      },
      'showMiddleName': {
        label: 'Show Middle Name',
        value: true,
        type: 'checkbox',
      },
      'showLastName': {
        label: 'Show Last Name',
        value: true,
        type: 'checkbox',
      },
      'showEmail': {
        label: 'Show Email',
        value: true,
        type: 'checkbox',
      },
      'showPhone': {
        label: 'Show Phone',
        value: true,
        type: 'checkbox',
      },
      'showDateOfBirth': {
        label: 'Show Date Of Birth',
        value: true,
        type: 'checkbox',
      },
      'showSignature': {
        label: 'Show Signature',
        value: true,
        type: 'checkbox',
      }
    },
    additionalMinors: {
      'showFirstName': {
        label: 'Show First Name',
        value: true,
        type: 'checkbox',
      },
      'showLastName': {
        label: 'Show Last Name',
        value: true,
        type: 'checkbox',
      },
      'showDateOfBirth': {
        label: 'Show Date Of Birth',
        value: true,
        type: 'checkbox',
      },
      'showRelationship': {
        label: 'Show Relationship',
        value: true,
        type: 'checkbox'
      }
    },
    electronicSignatureConsent: {
      'content': {
        label: 'Content',
        type: 'textarea',
        value: 'By checking here, you are consenting to the use of your electronic signature in lieu of an original signature on paper. You have the right to request that you sign a paper copy instead. By checking here, you are waiving that right. After consent, you may, upon written request to us, obtain a paper copy of an electronic record. No fee will be charged for such copy and no special hardware or software is required to view it. Your agreement to use an electronic signature with us for any documents will continue until such time as you notify us in writing that you no longer wish to use an electronic signature. There is no penalty for withdrawing your consent. You should always make sure that we have a current email address in order to contact you regarding any changes, if necessary.',
      }
    },
    capturePhoto: {
      'instructionHeader': {
        label: 'Instruction Header',
        type: 'text',
        value: 'Please follow the provided instructions to complete your Photo Capture'
      },
      'instructionLine1': {
        label: 'Instruction Line 1',
        type: 'text',
        value: 'Make sure your camera has a clear view of you.'
      },
      'instructionLine2': {
        label: 'Instruction Line 2',
        type: 'text',
        value: 'When you are ready, press the Take photo button while facing your camera.'
      },
      'instructionLine3': {
        label: 'Instruction Line 3',
        type: 'text',
        value: 'If you are not satisfied with the photo, press the Retake button to try again.'
      },
      'instructionLine4': {
        label: 'Instruction Line 4',
        type: 'text',
        value: ''
      },
      'buttonText': {
        label: 'Button Text',
        type: 'text',
        value: 'Capture Photo'
      }
    },
    filesUpload: {
      'instructionHeader': {
        label: 'Instruction Header',
        type: 'text',
        value: 'Please follow the provided instructions.'
      },
      'instructionLine1': {
        label: 'Instruction Line 1',
        type: 'text',
        value: 'Make sure your have a clear view of you.'
      },
      'instructionLine2': {
        label: 'Instruction Line 2',
        type: 'text',
        value: 'When you are ready, press the File Upload button.'
      },
      'instructionLine3': {
        label: 'Instruction Line 3',
        type: 'text',
        value: 'If you are not satisfied with the photo, click the fileUpload button to try again.'
      },
      'buttonText': {
        label: 'Button Text',
        type: 'text',
        value: 'Files Upload'
      }
    }
  }
};

function commonPayload(form, newDiv, fieldData) {
  let element = $(`.field-${fieldData.name}`);
  let buttonsHTML = '';

  function handleButtonClick(i) {
    return function () {
      newDiv.empty(); // Clear the contents of the newDiv
      for (let j = 1; j <= i + 1; j++) {
        newDiv.append(`<div class="participant-${j} ${fieldData.type === 'additionalParticipants' ? 'participants' : 'minors'}">
            <button class="delete-button block w-full" data-index="${j}"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="cursor-pointer text-red-500 w-6 h-6 ml-auto mr-2">
                      <path stroke-linecap="round" stroke-linejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"></path>
                    </svg></button>
           ${form}
          </div>`);
      }
      element.append(newDiv);
      $('.js-signature').jqSignature({
        autoFit: true,
        lineWidth: 3,
        height: 200,
        border: '1px solid transparent',
      });
      element.find('.delete-button').each(function () {
        $(this).on('click', function () {
          const index = $(this).data('index');
          $(`.participant-${index}`).remove();
        });
      });
    };
  }

  for (let i = 0; i < 6; i++) {
    buttonsHTML += `<button type="button" class="text-sm px-4 py-2 bg-gray-800 rounded-md font-semibold text-white hover:bg-gray-700 active:bg-gray-900 focus:outline-none disabled:opacity-25 transition ease-in-out duration-150 part-btn">${i + 1}</button>`;
  }
  element.append(`<div class="flex items-center justify-center gap-2">${buttonsHTML}</div>`);
  element.find('.part-btn').each(function (i) {
    $(this).on('click', handleButtonClick(i));
  });
}

export const initSignCode = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAABAAAAADICAYAAAB26ZNJAAAAAXNSR0IArs4c6QAAD6xJREFUeF7t2EEBAAAIAjHtX9oe3mzA8MWOI0CAAAECBAgQIECAAAECBN4L7PuEAhIgQIAAAQIECBAgQIAAAQJjAPAEBAgQIECAAAECBAgQIEAgIGAACJQsIgECBAgQIECAAAECBAgQMAD4AQIECBAgQIAAAQIECBAgEBAwAARKFpEAAQIECBAgQIAAAQIECBgA/AABAgQIECBAgAABAgQIEAgIGAACJYtIgAABAgQIECBAgAABAgQMAH6AAAECBAgQIECAAAECBAgEBAwAgZJFJECAAAECBAgQIECAAAECBgA/QIAAAQIECBAgQIAAAQIEAgIGgEDJIhIgQIAAAQIECBAgQIAAAQOAHyBAgAABAgQIECBAgAABAgEBA0CgZBEJECBAgAABAgQIECBAgIABwA8QIECAAAECBAgQIECAAIGAgAEgULKIBAgQIECAAAECBAgQIEDAAOAHCBAgQIAAAQIECBAgQIBAQMAAEChZRAIECBAgQIAAAQIECBAgYADwAwQIECBAgAABAgQIECBAICBgAAiULCIBAgQIECBAgAABAgQIEDAA+AECBAgQIECAAAECBAgQIBAQMAAEShaRAAECBAgQIECAAAECBAgYAPwAAQIECBAgQIAAAQIECBAICBgAAiWLSIAAAQIECBAgQIAAAQIEDAB+gAABAgQIECBAgAABAgQIBAQMAIGSRSRAgAABAgQIECBAgAABAgYAP0CAAAECBAgQIECAAAECBAICBoBAySISIECAAAECBAgQIECAAAEDgB8gQIAAAQIECBAgQIAAAQIBAQNAoGQRCRAgQIAAAQIECBAgQICAAcAPECBAgAABAgQIECBAgACBgIABIFCyiAQIECBAgAABAgQIECBAwADgBwgQIECAAAECBAgQIECAQEDAABAoWUQCBAgQIECAAAECBAgQIGAA8AMECBAgQIAAAQIECBAgQCAgYAAIlCwiAQIECBAgQIAAAQIECBAwAPgBAgQIECBAgAABAgQIECAQEDAABEoWkQABAgQIECBAgAABAgQIGAD8AAECBAgQIECAAAECBAgQCAgYAAIli0iAAAECBAgQIECAAAECBAwAfoAAAQIECBAgQIAAAQIECAQEDACBkkUkQIAAAQIECBAgQIAAAQIGAD9AgAABAgQIECBAgAABAgQCAgaAQMkiEiBAgAABAgQIECBAgAABA4AfIECAAAECBAgQIECAAAECAQEDQKBkEQkQIECAAAECBAgQIECAgAHADxAgQIAAAQIECBAgQIAAgYCAASBQsogECBAgQIAAAQIECBAgQMAA4AcIECBAgAABAgQIECBAgEBAwAAQKFlEAgQIECBAgAABAgQIECBgAPADBAgQIECAAAECBAgQIEAgIGAACJQsIgECBAgQIECAAAECBAgQMAD4AQIECBAgQIAAAQIECBAgEBAwAARKFpEAAQIECBAgQIAAAQIECBgA/AABAgQIECBAgAABAgQIEAgIGAACJYtIgAABAgQIECBAgAABAgQMAH6AAAECBAgQIECAAAECBAgEBAwAgZJFJECAAAECBAgQIECAAAECBgA/QIAAAQIECBAgQIAAAQIEAgIGgEDJIhIgQIAAAQIECBAgQIAAAQOAHyBAgAABAgQIECBAgAABAgEBA0CgZBEJECBAgAABAgQIECBAgIABwA8QIECAAAECBAgQIECAAIGAgAEgULKIBAgQIECAAAECBAgQIEDAAOAHCBAgQIAAAQIECBAgQIBAQMAAEChZRAIECBAgQIAAAQIECBAgYADwAwQIECBAgAABAgQIECBAICBgAAiULCIBAgQIECBAgAABAgQIEDAA+AECBAgQIECAAAECBAgQIBAQMAAEShaRAAECBAgQIECAAAECBAgYAPwAAQIECBAgQIAAAQIECBAICBgAAiWLSIAAAQIECBAgQIAAAQIEDAB+gAABAgQIECBAgAABAgQIBAQMAIGSRSRAgAABAgQIECBAgAABAgYAP0CAAAECBAgQIECAAAECBAICBoBAySISIECAAAECBAgQIECAAAEDgB8gQIAAAQIECBAgQIAAAQIBAQNAoGQRCRAgQIAAAQIECBAgQICAAcAPECBAgAABAgQIECBAgACBgIABIFCyiAQIECBAgAABAgQIECBAwADgBwgQIECAAAECBAgQIECAQEDAABAoWUQCBAgQIECAAAECBAgQIGAA8AMECBAgQIAAAQIECBAgQCAgYAAIlCwiAQIECBAgQIAAAQIECBAwAPgBAgQIECBAgAABAgQIECAQEDAABEoWkQABAgQIECBAgAABAgQIGAD8AAECBAgQIECAAAECBAgQCAgYAAIli0iAAAECBAgQIECAAAECBAwAfoAAAQIECBAgQIAAAQIECAQEDACBkkUkQIAAAQIECBAgQIAAAQIGAD9AgAABAgQIECBAgAABAgQCAgaAQMkiEiBAgAABAgQIECBAgAABA4AfIECAAAECBAgQIECAAAECAQEDQKBkEQkQIECAAAECBAgQIECAgAHADxAgQIAAAQIECBAgQIAAgYCAASBQsogECBAgQIAAAQIECBAgQMAA4AcIECBAgAABAgQIECBAgEBAwAAQKFlEAgQIECBAgAABAgQIECBgAPADBAgQIECAAAECBAgQIEAgIGAACJQsIgECBAgQIECAAAECBAgQMAD4AQIECBAgQIAAAQIECBAgEBAwAARKFpEAAQIECBAgQIAAAQIECBgA/AABAgQIECBAgAABAgQIEAgIGAACJYtIgAABAgQIECBAgAABAgQMAH6AAAECBAgQIECAAAECBAgEBAwAgZJFJECAAAECBAgQIECAAAECBgA/QIAAAQIECBAgQIAAAQIEAgIGgEDJIhIgQIAAAQIECBAgQIAAAQOAHyBAgAABAgQIECBAgAABAgEBA0CgZBEJECBAgAABAgQIECBAgIABwA8QIECAAAECBAgQIECAAIGAgAEgULKIBAgQIECAAAECBAgQIEDAAOAHCBAgQIAAAQIECBAgQIBAQMAAEChZRAIECBAgQIAAAQIECBAgYADwAwQIECBAgAABAgQIECBAICBgAAiULCIBAgQIECBAgAABAgQIEDAA+AECBAgQIECAAAECBAgQIBAQMAAEShaRAAECBAgQIECAAAECBAgYAPwAAQIECBAgQIAAAQIECBAICBgAAiWLSIAAAQIECBAgQIAAAQIEDAB+gAABAgQIECBAgAABAgQIBAQMAIGSRSRAgAABAgQIECBAgAABAgYAP0CAAAECBAgQIECAAAECBAICBoBAySISIECAAAECBAgQIECAAAEDgB8gQIAAAQIECBAgQIAAAQIBAQNAoGQRCRAgQIAAAQIECBAgQICAAcAPECBAgAABAgQIECBAgACBgIABIFCyiAQIECBAgAABAgQIECBAwADgBwgQIECAAAECBAgQIECAQEDAABAoWUQCBAgQIECAAAECBAgQIGAA8AMECBAgQIAAAQIECBAgQCAgYAAIlCwiAQIECBAgQIAAAQIECBAwAPgBAgQIECBAgAABAgQIECAQEDAABEoWkQABAgQIECBAgAABAgQIGAD8AAECBAgQIECAAAECBAgQCAgYAAIli0iAAAECBAgQIECAAAECBAwAfoAAAQIECBAgQIAAAQIECAQEDACBkkUkQIAAAQIECBAgQIAAAQIGAD9AgAABAgQIECBAgAABAgQCAgaAQMkiEiBAgAABAgQIECBAgAABA4AfIECAAAECBAgQIECAAAECAQEDQKBkEQkQIECAAAECBAgQIECAgAHADxAgQIAAAQIECBAgQIAAgYCAASBQsogECBAgQIAAAQIECBAgQMAA4AcIECBAgAABAgQIECBAgEBAwAAQKFlEAgQIECBAgAABAgQIECBgAPADBAgQIECAAAECBAgQIEAgIGAACJQsIgECBAgQIECAAAECBAgQMAD4AQIECBAgQIAAAQIECBAgEBAwAARKFpEAAQIECBAgQIAAAQIECBgA/AABAgQIECBAgAABAgQIEAgIGAACJYtIgAABAgQIECBAgAABAgQMAH6AAAECBAgQIECAAAECBAgEBAwAgZJFJECAAAECBAgQIECAAAECBgA/QIAAAQIECBAgQIAAAQIEAgIGgEDJIhIgQIAAAQIECBAgQIAAAQOAHyBAgAABAgQIECBAgAABAgEBA0CgZBEJECBAgAABAgQIECBAgIABwA8QIECAAAECBAgQIECAAIGAgAEgULKIBAgQIECAAAECBAgQIEDAAOAHCBAgQIAAAQIECBAgQIBAQMAAEChZRAIECBAgQIAAAQIECBAgYADwAwQIECBAgAABAgQIECBAICBgAAiULCIBAgQIECBAgAABAgQIEDAA+AECBAgQIECAAAECBAgQIBAQMAAEShaRAAECBAgQIECAAAECBAgYAPwAAQIECBAgQIAAAQIECBAICBgAAiWLSIAAAQIECBAgQIAAAQIEDAB+gAABAgQIECBAgAABAgQIBAQMAIGSRSRAgAABAgQIECBAgAABAgYAP0CAAAECBAgQIECAAAECBAICBoBAySISIECAAAECBAgQIECAAAEDgB8gQIAAAQIECBAgQIAAAQIBAQNAoGQRCRAgQIAAAQIECBAgQICAAcAPECBAgAABAgQIECBAgACBgIABIFCyiAQIECBAgAABAgQIECBAwADgBwgQIECAAAECBAgQIECAQEDAABAoWUQCBAgQIECAAAECBAgQIGAA8AMECBAgQIAAAQIECBAgQCAgYAAIlCwiAQIECBAgQIAAAQIECBAwAPgBAgQIECBAgAABAgQIECAQEDAABEoWkQABAgQIECBAgAABAgQIGAD8AAECBAgQIECAAAECBAgQCAgYAAIli0iAAAECBAgQIECAAAECBAwAfoAAAQIECBAgQIAAAQIECAQEDACBkkUkQIAAAQIECBAgQIAAAQIGAD9AgAABAgQIECBAgAABAgQCAgaAQMkiEiBAgAABAgQIECBAgAABA4AfIECAAAECBAgQIECAAAECAQEDQKBkEQkQIECAAAECBAgQIECAgAHADxAgQIAAAQIECBAgQIAAgYCAASBQsogECBAgQIAAAQIECBAgQMAA4AcIECBAgAABAgQIECBAgEBAwAAQKFlEAgQIECBAgAABAgQIECBgAPADBAgQIECAAAECBAgQIEAgIGAACJQsIgECBAgQIECAAAECBAgQMAD4AQIECBAgQIAAAQIECBAgEBAwAARKFpEAAQIECBAgQIAAAQIECBgA/AABAgQIECBAgAABAgQIEAgIGAACJYtIgAABAgQIECBAgAABAgQOWacAyQIYvuUAAAAASUVORK5CYII='

const modalInitialCode = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAV4AAAEsCAYAAACLwdvQAAAAAXNSR0IArs4c6QAACXpJREFUeF7t1MEJAAAIAzG7/9Juca+4QCHI7RwBAgQIpAJL14wRIECAwAmvJyBAgEAsILwxuDkCBAgIrx8gQIBALCC8Mbg5AgQICK8fIECAQCwgvDG4OQIECAivHyBAgEAsILwxuDkCBAgIrx8gQIBALCC8Mbg5AgQICK8fIECAQCwgvDG4OQIECAivHyBAgEAsILwxuDkCBAgIrx8gQIBALCC8Mbg5AgQICK8fIECAQCwgvDG4OQIECAivHyBAgEAsILwxuDkCBAgIrx8gQIBALCC8Mbg5AgQICK8fIECAQCwgvDG4OQIECAivHyBAgEAsILwxuDkCBAgIrx8gQIBALCC8Mbg5AgQICK8fIECAQCwgvDG4OQIECAivHyBAgEAsILwxuDkCBAgIrx8gQIBALCC8Mbg5AgQICK8fIECAQCwgvDG4OQIECAivHyBAgEAsILwxuDkCBAgIrx8gQIBALCC8Mbg5AgQICK8fIECAQCwgvDG4OQIECAivHyBAgEAsILwxuDkCBAgIrx8gQIBALCC8Mbg5AgQICK8fIECAQCwgvDG4OQIECAivHyBAgEAsILwxuDkCBAgIrx8gQIBALCC8Mbg5AgQICK8fIECAQCwgvDG4OQIECAivHyBAgEAsILwxuDkCBAgIrx8gQIBALCC8Mbg5AgQICK8fIECAQCwgvDG4OQIECAivHyBAgEAsILwxuDkCBAgIrx8gQIBALCC8Mbg5AgQICK8fIECAQCwgvDG4OQIECAivHyBAgEAsILwxuDkCBAgIrx8gQIBALCC8Mbg5AgQICK8fIECAQCwgvDG4OQIECAivHyBAgEAsILwxuDkCBAgIrx8gQIBALCC8Mbg5AgQICK8fIECAQCwgvDG4OQIECAivHyBAgEAsILwxuDkCBAgIrx8gQIBALCC8Mbg5AgQICK8fIECAQCwgvDG4OQIECAivHyBAgEAsILwxuDkCBAgIrx8gQIBALCC8Mbg5AgQICK8fIECAQCwgvDG4OQIECAivHyBAgEAsILwxuDkCBAgIrx8gQIBALCC8Mbg5AgQICK8fIECAQCwgvDG4OQIECAivHyBAgEAsILwxuDkCBAgIrx8gQIBALCC8Mbg5AgQICK8fIECAQCwgvDG4OQIECAivHyBAgEAsILwxuDkCBAgIrx8gQIBALCC8Mbg5AgQICK8fIECAQCwgvDG4OQIECAivHyBAgEAsILwxuDkCBAgIrx8gQIBALCC8Mbg5AgQICK8fIECAQCwgvDG4OQIECAivHyBAgEAsILwxuDkCBAgIrx8gQIBALCC8Mbg5AgQICK8fIECAQCwgvDG4OQIECAivHyBAgEAsILwxuDkCBAgIrx8gQIBALCC8Mbg5AgQICK8fIECAQCwgvDG4OQIECAivHyBAgEAsILwxuDkCBAgIrx8gQIBALCC8Mbg5AgQICK8fIECAQCwgvDG4OQIECAivHyBAgEAsILwxuDkCBAgIrx8gQIBALCC8Mbg5AgQICK8fIECAQCwgvDG4OQIECAivHyBAgEAsILwxuDkCBAgIrx8gQIBALCC8Mbg5AgQICK8fIECAQCwgvDG4OQIECAivHyBAgEAsILwxuDkCBAgIrx8gQIBALCC8Mbg5AgQICK8fIECAQCwgvDG4OQIECAivHyBAgEAsILwxuDkCBAgIrx8gQIBALCC8Mbg5AgQICK8fIECAQCwgvDG4OQIECAivHyBAgEAsILwxuDkCBAgIrx8gQIBALCC8Mbg5AgQICK8fIECAQCwgvDG4OQIECAivHyBAgEAsILwxuDkCBAgIrx8gQIBALCC8Mbg5AgQICK8fIECAQCwgvDG4OQIECAivHyBAgEAsILwxuDkCBAgIrx8gQIBALCC8Mbg5AgQICK8fIECAQCwgvDG4OQIECAivHyBAgEAsILwxuDkCBAgIrx8gQIBALCC8Mbg5AgQICK8fIECAQCwgvDG4OQIECAivHyBAgEAsILwxuDkCBAgIrx8gQIBALCC8Mbg5AgQICK8fIECAQCwgvDG4OQIECAivHyBAgEAsILwxuDkCBAgIrx8gQIBALCC8Mbg5AgQICK8fIECAQCwgvDG4OQIECAivHyBAgEAsILwxuDkCBAgIrx8gQIBALCC8Mbg5AgQICK8fIECAQCwgvDG4OQIECAivHyBAgEAsILwxuDkCBAgIrx8gQIBALCC8Mbg5AgQICK8fIECAQCwgvDG4OQIECAivHyBAgEAsILwxuDkCBAgIrx8gQIBALCC8Mbg5AgQICK8fIECAQCwgvDG4OQIECAivHyBAgEAsILwxuDkCBAgIrx8gQIBALCC8Mbg5AgQICK8fIECAQCwgvDG4OQIECAivHyBAgEAsILwxuDkCBAgIrx8gQIBALCC8Mbg5AgQICK8fIECAQCwgvDG4OQIECAivHyBAgEAsILwxuDkCBAgIrx8gQIBALCC8Mbg5AgQICK8fIECAQCwgvDG4OQIECAivHyBAgEAsILwxuDkCBAgIrx8gQIBALCC8Mbg5AgQICK8fIECAQCwgvDG4OQIECAivHyBAgEAsILwxuDkCBAgIrx8gQIBALCC8Mbg5AgQICK8fIECAQCwgvDG4OQIECAivHyBAgEAsILwxuDkCBAgIrx8gQIBALCC8Mbg5AgQICK8fIECAQCwgvDG4OQIECAivHyBAgEAsILwxuDkCBAgIrx8gQIBALCC8Mbg5AgQICK8fIECAQCwgvDG4OQIECAivHyBAgEAsILwxuDkCBAgIrx8gQIBALCC8Mbg5AgQICK8fIECAQCwgvDG4OQIECAivHyBAgEAsILwxuDkCBAgIrx8gQIBALCC8Mbg5AgQICK8fIECAQCwgvDG4OQIECAivHyBAgEAsILwxuDkCBAgIrx8gQIBALCC8Mbg5AgQICK8fIECAQCwgvDG4OQIECAivHyBAgEAsILwxuDkCBAgIrx8gQIBALCC8Mbg5AgQICK8fIECAQCwgvDG4OQIECAivHyBAgEAsILwxuDkCBAgIrx8gQIBALCC8Mbg5AgQICK8fIECAQCwgvDG4OQIECAivHyBAgEAsILwxuDkCBAgIrx8gQIBALCC8Mbg5AgQICK8fIECAQCwgvDG4OQIECAivHyBAgEAsILwxuDkCBAgIrx8gQIBALCC8Mbg5AgQICK8fIECAQCwgvDG4OQIECAivHyBAgEAsILwxuDkCBAgIrx8gQIBALCC8Mbg5AgQIPNUfAS20yRm1AAAAAElFTkSuQmCC'

export function events() {
  const body = document.querySelector(`table`);
  body.addEventListener('click', function (e) {
    let idx = e.target.classList[0]?.split('-')[1]
    //open the sign modal
    if (e.target.classList[0]?.includes('init')) {
      navigator.clipboard.readText().then(r => {
        if (!r.includes('data:image/png')) {
          document.querySelectorAll(`.modal`)[idx].classList.remove('hidden')
        } else {
          const tableCell = document.getElementById(`initials-${idx}`);
          tableCell.innerHTML += `<img src="${r}" style="height: 100%; width:100%" alt='' />`;
        }
      }).catch((e) => alert(`${e}\nClick on the clipboard icon to allow read permission`))
    }
    // if clicked on image
    else if (e.target.tagName === 'IMG' && e.target.parentNode.classList[0].includes('init')) {
      let idx = e.target.parentNode.classList[0]?.split('-')[1];
      document.querySelectorAll(`.js-signature.initial-signature-pad`)[idx].innerHTML =
        `<img src="${e.target.src}" style="width: 350px; height: 300px;" alt='' />`
      document.querySelectorAll(`.modal`)[idx].classList.remove('hidden')
    }
    //handle cancel button click
    else if (e.target.classList[0]?.includes('cac')) {
      const cancelBtn = document.getElementById(`${e.target.classList[0]}-cancel`);
      cancelBtn.addEventListener('click', function (e) {
        let signNode = document.querySelectorAll('.js-signature.initial-signature-pad')[idx];
        $(signNode).jqSignature('clearCanvas');
        document.querySelectorAll(`.modal`)[idx].classList.add('hidden')
      })
      cancelBtn.click();
    }
    //handle done button
    else if (e.target.classList[0]?.includes('done')) {
      const doneBtn = document.getElementById(`${e.target.classList[0]}-done`);
      doneBtn.addEventListener('click', function (e) {
        let signNode = document.querySelectorAll('.js-signature.initial-signature-pad')[idx];
        let sign = $(signNode).jqSignature('getDataURL');
        console.log(sign === initSignCode, sign, modalInitialCode)
        if(sign === modalInitialCode){
          document.querySelectorAll(`.modal`)[idx].classList.add('hidden')
          return
        }
        navigator.clipboard.writeText(sign);
        const tableCell = document.getElementById(`initials-${idx}`)
        let children = tableCell.children;
        if (children.length > 1) {
          children[1].src = sign
        } else tableCell.innerHTML += `<img src="${sign}" style="height: 100%; width:100%" alt='' />`;
        document.querySelectorAll(`.modal`)[idx].classList.add('hidden')
      })
      doneBtn.click();
    }
    //clear button
    else if (e.target.classList[0]?.includes('clear')) {
      const clearBtn = document.querySelector(`.${e.target.classList[0]}`);
      clearBtn.addEventListener('click', function (e) {
        let signNode = document.querySelectorAll('.js-signature.initial-signature-pad')[idx];
        if (signNode.firstChild.tagName === 'IMG') {
          let tempDiv = document.createElement('div');
          tempDiv.classList.add('js-signature', 'initial-signature-pad');
          signNode.parentNode.replaceChild(tempDiv, signNode);
          $(tempDiv).jqSignature({width: 350, height: 300, lineWidth: 3});
        }
        $(signNode).jqSignature('clearCanvas');
      })
      clearBtn.click();
    }
    // if checkbox is checked
    else if (e.target.type === 'checkbox' && e.target.checked) {
      e.target.setAttribute("checked", "checked");
    }
    // if checkbox is not checked
    else if (e.target.type === 'checkbox' && !e.target.checked) {
      e.target.removeAttribute("checked");
    }
  })

  const signCell = document.querySelectorAll('.sign');
  for (let i = 0; i < signCell.length; i++) {
    signCell[i].innerHTML = htmlModal(i);
  }
  $('.js-signature.initial-signature-pad').jqSignature({width: 350, height: 300, lineWidth: 3});
}

export function hideList(type) {
  let existingForms = document.querySelectorAll('.primaryAdultParticipant-field');
  if (existingForms.length > 0) document.querySelector('li[data-type="primaryAdultParticipant"]').style.display = type;
}